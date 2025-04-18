import { StyleSheet } from '@react-pdf/renderer';

export const modernStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2pt solid #3498db',
    paddingBottom: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactInfo: {
    fontSize: 10,
    color: '#7f8c8d',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    borderBottom: '1pt solid #bdc3c7',
    paddingBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  item: {
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 10,
    color: '#7f8c8d',
  },
  duration: {
    fontSize: 10,
    color: '#7f8c8d',
  },
  description: {
    fontSize: 10,
    color: '#2c3e50',
    marginTop: 4,
    lineHeight: 1.4,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skill: {
    fontSize: 10,
    color: '#2c3e50',
    backgroundColor: '#ecf0f1',
    padding: '2 6',
    borderRadius: 4,
  },
  technologies: {
    fontSize: 10,
    color: '#7f8c8d',
    marginTop: 4,
  },
  link: {
    fontSize: 10,
    color: '#3498db',
    textDecoration: 'none',
  },
}); 