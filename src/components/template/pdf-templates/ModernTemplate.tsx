import type React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Link,
  Font,
  Svg,
  Path,
  Line,
} from '@react-pdf/renderer';
import type { ResumeSections } from '@/types';

// Register fonts for more professional appearance
Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf',
      fontWeight: 600,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf',
      fontWeight: 700,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf',
      fontStyle: 'italic',
    },
  ],
});

interface ModernTemplateProps {
  sections: ResumeSections;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Open Sans',
    color: '#333',
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2563eb',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
    fontSize: 10,
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 3,
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
  section: {
    marginBottom: 15,
    breakInside: 'avoid',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingBottom: 2,
    borderBottom: '1px solid #2563eb',
    color: '#2563eb',
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  skillCategory: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight: 10,
  },
  skillItem: {
    fontSize: 10,
    backgroundColor: '#e6effd',
    padding: '3 6',
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 3,
  },
  experienceItem: {
    marginBottom: 10,
    breakInside: 'avoid',
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 11,
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
  projectHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1px',
  },
  projectName: {
    fontSize: 12,
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
    backgroundColor: '#e6effd',
    padding: '2 4',
    marginRight: 4,
    marginBottom: 3,
    borderRadius: 2,
  },
  certificationItem: {
    marginBottom: 6,
    breakInside: 'avoid',
  },
  certificationName: {
    fontSize: 11,
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
  customEntryItem: {
    marginBottom: 6,
    breakInside: 'avoid',
  },
  customEntryOrg: {
    fontSize: 11,
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
  twoColumnLayout: {
    flexDirection: 'row',
  },
  mainColumn: {
    width: '70%',
    paddingRight: 15,
  },
  sideColumn: {
    width: '30%',
  },
  pageBreak: {
    breakAfter: 'page',
    breakBefore: 'avoid',
  },
});

export const PDFLinkIcon = () => (
  <Svg viewBox="0 0 24 24" style={{ marginLeft: 5, width: 10, height: 10 }}>
    <Path
      d="M9 17H7A5 5 0 0 1 7 7h2"
      strokeWidth="2"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 7h2a5 5 0 1 1 0 10h-2"
      strokeWidth="2"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="8"
      y1="12"
      x2="16"
      y2="12"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#000"
    />
  </Svg>
);

const ModernTemplate: React.FC<ModernTemplateProps> = ({ sections }) => {
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

      <View style={styles.twoColumnLayout}>
        <View style={styles.mainColumn}>
          {/* Summary Section */}
          {sections.summary && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>
                {sections.summary.data.summary}
              </Text>
            </View>
          )}

          {/* Work Experience Section */}
          {sections.workExperience &&
            sections.workExperience.data.length > 0 && (
              <View style={styles.section} wrap={false}>
                <Text style={styles.sectionTitle}>Work Experience</Text>
                {sections.workExperience.data.map((job, index) => (
                  <View key={index} style={styles.experienceItem} wrap={false}>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <Text style={styles.company}>{job.company}</Text>
                    <Text style={styles.duration}>{job.duration}</Text>
                    {job.description && (
                      <Text style={styles.description}>{job.description}</Text>
                    )}
                    {job.responsibilities &&
                      job.responsibilities.length > 0 && (
                        <View style={styles.bulletContainer}>
                          {job.responsibilities.map((responsibility, idx) => (
                            <Text key={idx} style={styles.bulletPoint}>
                              • {responsibility}
                            </Text>
                          ))}
                        </View>
                      )}
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
                    <View style={styles.technologies}>
                      {project.technologies.map((tech, idx) => (
                        <Text key={idx} style={styles.technologyItem}>
                          {tech}
                        </Text>
                      ))}
                    </View>
                  )}
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
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.dates}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                  {edu.cgpa && (
                    <Text style={styles.description}>CGPA: {edu.cgpa}</Text>
                  )}
                  {edu.percentage && (
                    <Text style={styles.description}>
                      Percentage: {edu.percentage}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.sideColumn}>
          {/* Skills Section */}
          {sections.skills && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {sections.skills.data.hardSkills &&
                sections.skills.data.hardSkills.length > 0 && (
                  <View style={{ marginBottom: 8 }}>
                    <Text style={styles.skillCategory}>Technical Skills</Text>
                    <View style={styles.skillsContainer}>
                      {sections.skills.data.hardSkills.map((skill, index) => (
                        <Text key={index} style={styles.skillItem}>
                          {skill}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
              {sections.skills.data.softSkills &&
                sections.skills.data.softSkills.length > 0 && (
                  <View>
                    <Text style={styles.skillCategory}>Soft Skills</Text>
                    <View style={styles.skillsContainer}>
                      {sections.skills.data.softSkills.map((skill, index) => (
                        <Text key={index} style={styles.skillItem}>
                          {skill}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
            </View>
          )}

          {/* Certifications Section */}
          {sections.certifications &&
            sections.certifications.data.length > 0 && (
              <View style={styles.section} wrap={false}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {sections.certifications.data.map((cert, index) => (
                  <View
                    key={index}
                    style={styles.certificationItem}
                    wrap={false}
                  >
                    <View style={styles.projectHeader}>
                      <Text style={styles.certificationName}>{cert.name}</Text>
                      {cert.url && (
                        <Link src={cert.url} style={styles.link}>
                          <PDFLinkIcon />
                        </Link>
                      )}
                    </View>
                    <Text style={styles.certificationIssuer}>
                      {cert.issuer}
                    </Text>
                    <Text style={styles.certificationDate}>{cert.date}</Text>
                  </View>
                ))}
              </View>
            )}

          {/* Languages Section */}
          {sections.languages && sections.languages.data.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>Languages</Text>
              {sections.languages.data.map((lang, index) => (
                <View key={index} style={styles.languageItem} wrap={false}>
                  <Text style={styles.language}>{lang.language}:</Text>
                  <Text style={styles.proficiency}>{lang.proficiency}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Awards Section */}
          {sections.awards && sections.awards.data.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>Awards</Text>
              {sections.awards.data.map((award, index) => (
                <View key={index} style={styles.awardItem} wrap={false}>
                  <Text style={styles.awardTitle}>{award.title}</Text>
                  <Text style={styles.awardIssuer}>{award.issuer}</Text>
                  <Text style={styles.awardYear}>{award.year}</Text>
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
                  <Text style={styles.publicationName}>{pub.publication}</Text>
                  <Text style={styles.publicationDate}>{pub.date}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Hobbies Section */}
          {sections.hobbies && sections.hobbies.data.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>Hobbies & Interests</Text>
              {sections.hobbies.data.map((hobby, index) => (
                <Text key={index} style={styles.hobbyItem}>
                  • {hobby}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>

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

export default ModernTemplate;
