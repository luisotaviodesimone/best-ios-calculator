import {
  ButtonProps as RNButtonProps,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

// set dimmenstion
const screen = Dimensions.get('window');
const buttonWidth = screen.width / 4;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333333',
    flex: 1,
    height: Math.floor(buttonWidth - 10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Math.floor(buttonWidth),
    margin: 5,
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  textSecondary: {
    color: '#060606',
  },
  textLg: {
    fontSize: 32,
  },
  buttonDouble: {
    width: screen.width / 2 - 10,
    flex: 0,
    alignItems: 'flex-start',
    paddingLeft: 40,
  },
  buttonSecondary: {
    backgroundColor: '#a6a6a6',
  },
  buttonAccent: {
    backgroundColor: '#d400ff',
    fontSize: 20,
  },
});

interface ButtonProps {
  onPress: RNButtonProps['onPress'];
  text?: string;
  size?: 'double';
  theme?: 'secondary' | 'primary' | 'accent';
}

export default ({ onPress, text, size, theme }: ButtonProps) => {
  const buttonStyles: Record<string, string | number>[] = [styles.button];
  const textStyles: Record<string, string | number>[] = [styles.text];

  if (size === 'double') {
    buttonStyles.push(styles.buttonDouble);
  }

  if (theme === 'secondary') {
    buttonStyles.push(styles.buttonSecondary);
    textStyles.push(styles.textSecondary);
  } else if (theme === 'accent') {
    buttonStyles.push(styles.buttonAccent);
    textStyles.push(styles.textLg)
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};
