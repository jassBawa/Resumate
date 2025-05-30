import type React from 'react';
import { Text, View, StyleSheet, Link, Font } from '@react-pdf/renderer';
import type { ResumeSections } from '@/types';
import { PDFLinkIcon } from './ModernTemplate';

// Register fonts for more professional appearance
Font.register({
  family: 'Times New Roman',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman@1.0.4/Times New Roman.ttf',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman-bold@1.0.4/Times New Roman Bold.ttf',
      fontWeight: 700,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman-italic@1.0.4/Times New Roman Italic.ttf',
      fontStyle: 'italic',
    },
  ],
});

interface ClassicTemplateProps {
  sections: ResumeSections;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Times New Roman',
    color: '#000',
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    borderBottom: '1px solid #000',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 5,
    fontSize: 10,
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 3,
  },
  link: {
    color: '#000',
    textDecoration: 'underline',
  },
  projectHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1px',
  },
  section: {
    marginBottom: 15,
    breakInside: 'avoid',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    borderBottom: '1px solid #000',
    paddingBottom: 2,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 10,
    textAlign: 'justify',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  skillCategory: {
    fontSize: 12,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  skillItem: {
    fontSize: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  experienceItem: {
    marginBottom: 10,
    breakInside: 'avoid',
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
  },
  company: {
    fontSize: 11,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
  },
  duration: {
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 3,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  bulletContainer: {
    marginLeft: 10,
    marginTop: 3,
  },
  educationItem: {
    marginBottom: 8,
    breakInside: 'avoid',
  },
  institution: {
    fontSize: 12,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
  },
  degree: {
    fontSize: 11,
  },
  dates: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  projectItem: {
    marginBottom: 8,
    breakInside: 'avoid',
  },
  projectName: {
    fontSize: 12,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  technologies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 3,
  },
  technologyItem: {
    fontSize: 9,
    marginRight: 4,
    marginBottom: 3,
  },
  certificationItem: {
    marginBottom: 6,
    breakInside: 'avoid',
  },
  certificationName: {
    fontSize: 11,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
  },
  certificationIssuer: {
    fontSize: 10,
  },
  certificationDate: {
    fontSize: 9,
    fontStyle: 'italic',
  },
  awardItem: {
    marginBottom: 6,
    breakInside: 'avoid',
  },
  awardTitle: {
    fontSize: 11,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
  },
  awardIssuer: {
    fontSize: 10,
  },
  awardYear: {
    fontSize: 9,
    fontStyle: 'italic',
  },
  publicationItem: {
    marginBottom: 6,
    breakInside: 'avoid',
  },
  publicationTitle: {
    fontSize: 11,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
  },
  publicationName: {
    fontSize: 10,
  },
  publicationDate: {
    fontSize: 9,
    fontStyle: 'italic',
  },
  languageItem: {
    marginBottom: 4,
    flexDirection: 'row',
    breakInside: 'avoid',
  },
  language: {
    fontSize: 10,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    marginRight: 5,
  },
  proficiency: {
    fontSize: 10,
  },
  hobbyItem: {
    fontSize: 10,
    marginBottom: 2,
  },
  customSectionTitle: {
    fontSize: 12,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  customEntryItem: {
    marginBottom: 6,
    breakInside: 'avoid',
  },
  customEntryOrg: {
    fontSize: 11,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
  },
  customEntryRole: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  customEntryDesc: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  column: {
    flexDirection: 'column',
  },
  leftColumn: {
    width: '25%',
    paddingRight: 10,
  },
  rightColumn: {
    width: '75%',
  },
  pageBreak: {
    breakAfter: 'page',
    breakBefore: 'avoid',
  },
});

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ sections }) => {
  return (
    <View style={styles.page}>
      {/* Header with Contact Information */}
      {sections.contactInfo && (
        <View style={styles.header}>
          <Text style={styles.name}>{sections.contactInfo.data.name}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>
              {sections.contactInfo.data.email}
            </Text>
            <Text style={styles.contactItem}>
              {sections.contactInfo.data.phone}
            </Text>
            <Text style={styles.contactItem}>
              {sections.contactInfo.data.location}
            </Text>
            {sections.contactInfo.data.linkedin && (
              <Link
                src={sections.contactInfo.data.linkedin}
                style={styles.link}
              >
                <Text style={styles.contactItem}>LinkedIn</Text>
              </Link>
            )}
          </View>
        </View>
      )}

      {/* Summary Section */}
      {sections.summary && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{sections.summary.data.summary}</Text>
        </View>
      )}

      {/* Skills Section */}
      {sections.skills && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {sections.skills.data.hardSkills &&
            sections.skills.data.hardSkills.length > 0 && (
              <View style={styles.row}>
                <View style={styles.leftColumn}>
                  <Text style={styles.skillCategory}>Technical Skills:</Text>
                </View>
                <View style={styles.rightColumn}>
                  <Text style={styles.description}>
                    {sections.skills.data.hardSkills.join(', ')}
                  </Text>
                </View>
              </View>
            )}
          {sections.skills.data.softSkills &&
            sections.skills.data.softSkills.length > 0 && (
              <View style={styles.row}>
                <View style={styles.leftColumn}>
                  <Text style={styles.skillCategory}>Soft Skills:</Text>
                </View>
                <View style={styles.rightColumn}>
                  <Text style={styles.description}>
                    {sections.skills.data.softSkills.join(', ')}
                  </Text>
                </View>
              </View>
            )}
        </View>
      )}

      {/* Work Experience Section */}
      {sections.workExperience && sections.workExperience.data.length > 0 && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {sections.workExperience.data.map((job, index) => (
            <View key={index} style={styles.experienceItem} wrap={false}>
              <View style={styles.row}>
                <View style={styles.leftColumn}>
                  <Text style={styles.duration}>{job.duration}</Text>
                </View>
                <View style={styles.rightColumn}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.company}>{job.company}</Text>
                  {job.description && (
                    <Text style={styles.description}>{job.description}</Text>
                  )}
                  {job.responsibilities && job.responsibilities.length > 0 && (
                    <View style={styles.bulletContainer}>
                      {job.responsibilities.map((responsibility, idx) => (
                        <Text key={idx} style={styles.bulletPoint}>
                          • {responsibility}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Education Section */}
      {sections.education && sections.education.data.length > 0 && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Education</Text>
          {sections.education.data.map((edu, index) => (
            <View key={index} style={styles.educationItem} wrap={false}>
              <View style={styles.row}>
                <View style={styles.leftColumn}>
                  <Text style={styles.dates}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
                <View style={styles.rightColumn}>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  {edu.cgpa && (
                    <Text style={styles.description}>CGPA: {edu.cgpa}</Text>
                  )}
                  {edu.percentage && (
                    <Text style={styles.description}>
                      Percentage: {edu.percentage}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Projects Section */}
      {sections.projects && sections.projects.data.length > 0 && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {sections.projects.data.map((project, index) => (
            <View key={index} style={styles.projectItem} wrap={false}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{project.name}</Text>
                {project.url && (
                  <Link src={project.url} style={styles.link}>
                    <PDFLinkIcon />
                  </Link>
                )}
              </View>
              <Text style={styles.projectDescription}>
                {project.description}
              </Text>
              {project.technologies && project.technologies.length > 0 && (
                <Text style={styles.description}>
                  <Text
                    style={{
                      fontFamily: 'Times New Roman',
                      fontWeight: 'bold',
                    }}
                  >
                    Technologies:{' '}
                  </Text>
                  {project.technologies.join(', ')}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Certifications Section */}
      {sections.certifications && sections.certifications.data.length > 0 && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {sections.certifications.data.map((cert, index) => (
            <View key={index} style={styles.certificationItem} wrap={false}>
              <View style={styles.projectHeader}>
                <Text style={styles.certificationName}>{cert.name}</Text>
                {cert.url && (
                  <Link src={cert.url} style={styles.link}>
                    <PDFLinkIcon />
                  </Link>
                )}
              </View>
              <Text style={styles.certificationIssuer}>
                {cert.issuer}, {cert.date}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Awards Section */}
      {sections.awards && sections.awards.data.length > 0 && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Awards & Honors</Text>
          {sections.awards.data.map((award, index) => (
            <View key={index} style={styles.awardItem} wrap={false}>
              <Text style={styles.awardTitle}>{award.title}</Text>
              <Text style={styles.awardIssuer}>
                {award.issuer}, {award.year}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Publications Section */}
      {sections.publications && sections.publications.data.length > 0 && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Publications</Text>
          {sections.publications.data.map((pub, index) => (
            <View key={index} style={styles.publicationItem} wrap={false}>
              <View style={styles.projectHeader}>
                <Text style={styles.publicationTitle}>{pub.title}</Text>
                {pub.url && (
                  <Link src={pub.url} style={styles.link}>
                    <PDFLinkIcon />
                  </Link>
                )}
              </View>
              <Text style={styles.publicationName}>
                {pub.publication}, {pub.date}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Languages Section */}
      {sections.languages && sections.languages.data.length > 0 && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.row}>
            {sections.languages.data.map((lang, index) => (
              <Text key={index} style={styles.description}>
                {lang.language} ({lang.proficiency})
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Hobbies Section */}
      {sections.hobbies && sections.hobbies.data.length > 0 && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <Text style={styles.description}>
            {sections.hobbies.data.join(', ')}
          </Text>
        </View>
      )}

      {/* Custom Sections */}
      {sections.customSection && sections.customSection.data.length > 0 && (
        <View style={styles.section} wrap={false}>
          {sections.customSection.data.map((customSec, index) => (
            <View key={index} style={{ marginBottom: 10 }} wrap={false}>
              <Text style={styles.sectionTitle}>{customSec.sectionTitle}</Text>
              {customSec.entries.map((entry, idx) => (
                <View key={idx} style={styles.customEntryItem} wrap={false}>
                  {entry.organization && (
                    <Text style={styles.customEntryOrg}>
                      {entry.organization}
                    </Text>
                  )}
                  {entry.role && (
                    <Text style={styles.customEntryRole}>{entry.role}</Text>
                  )}
                  {entry.description && (
                    <Text style={styles.customEntryDesc}>
                      {entry.description}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ClassicTemplate;
