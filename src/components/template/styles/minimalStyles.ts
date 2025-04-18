import { StyleSheet } from '@react-pdf/renderer';

export const minimalStyles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 9,
    color: '#666666',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  item: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 9,
    color: '#666666',
  },
  duration: {
    fontSize: 9,
    color: '#666666',
  },
  description: {
    fontSize: 9,
    color: '#333333',
    marginTop: 2,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skill: {
    fontSize: 9,
    color: '#666666',
    backgroundColor: '#f5f5f5',
    padding: '1 4',
  },
  technologies: {
    fontSize: 9,
    color: '#666666',
    marginTop: 2,
  },
  link: {
    fontSize: 9,
    color: '#000000',
    textDecoration: 'none',
  },
}); 