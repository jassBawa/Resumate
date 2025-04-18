import { StyleSheet } from '@react-pdf/renderer';

export const creativeStyles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#1f1f1f',
    color: '#ffffff',
    padding: 30,
    minHeight: '100%',
  },
  mainContent: {
    width: '70%',
    padding: '40px 30px',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 25,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  contactInfo: {
    fontSize: 11,
    color: '#cccccc',
    flexDirection: 'column',
    gap: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  mainSectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f1f1f',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  item: {
    marginBottom: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  mainTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f1f1f',
  },
  subtitle: {
    fontSize: 11,
    color: '#cccccc',
  },
  mainSubtitle: {
    fontSize: 12,
    color: '#666666',
  },
  duration: {
    fontSize: 11,
    color: '#cccccc',
  },
  mainDuration: {
    fontSize: 12,
    color: '#666666',
  },
  description: {
    fontSize: 11,
    color: '#cccccc',
    marginTop: 5,
    lineHeight: 1.4,
  },
  mainDescription: {
    fontSize: 12,
    color: '#333333',
    marginTop: 5,
    lineHeight: 1.6,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  skill: {
    fontSize: 11,
    color: '#ffffff',
    backgroundColor: '#333333',
    padding: '4 8',
    borderRadius: 4,
  },
  technologies: {
    fontSize: 11,
    color: '#cccccc',
    marginTop: 5,
  },
  mainTechnologies: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
  },
  link: {
    fontSize: 11,
    color: '#cccccc',
    textDecoration: 'none',
  },
  mainLink: {
    fontSize: 12,
    color: '#0066cc',
    textDecoration: 'none',
  },
}); 