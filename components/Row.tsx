import { StyleSheet, View } from 'react-native';

interface RowProps {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

const Row = ({ children }: RowProps) => {
  return <View style={styles.container}>{children}</View>;
};

export default Row;
