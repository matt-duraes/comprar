import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 62,
    backgroundColor: '#D0D2D8'
  },
  logo: {
    width: 134,
    height: 34,
  },
  form: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 7,
    marginTop: 42,
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 32,
    marginTop: 24,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    borderBottomWidth: 1,
    borderColor: '#e4e6ec',
    paddingBottom: 12
  },
  clearButton: {
    marginLeft: 'auto',
  },
  clearText: {
    fontSize: 12,
    color: '#828282',
    fontWeight: '600',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#eef0f5',
    marginVertical: 16
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 62,
  },
  empty: {
    fontSize: 14,
    color: '#808080',
    textAlign: 'center',
  }
});
