import { StyleSheet } from '@react-pdf/renderer';

export const classicStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Times-Roman',
  },
  header: {
    marginBottom: 20,
    borderBottom: '1pt solid #000000',
    paddingBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    color: '#333333',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    borderBottom: '1pt solid #000000',
    paddingBottom: 4,
  },
  item: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 10,
    color: '#333333',
  },
  duration: {
    fontSize: 10,
    color: '#666666',
  },
  description: {
    fontSize: 10,
    color: '#000000',
    marginTop: 4,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skill: {
    fontSize: 10,
    color: '#333333',
    backgroundColor: '#f0f0f0',
    padding: '2 6',
    borderRadius: 4,
  },
  technologies: {
    fontSize: 10,
    color: '#666666',
    marginTop: 4,
  },
  link: {
    fontSize: 10,
    color: '#0000ff',
    textDecoration: 'none',
  },
}); 