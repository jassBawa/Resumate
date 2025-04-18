import type React from 'react';
import { Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import type { ResumeSections } from '@/config/parseSections';
import { PDFLinkIcon } from './ModernTemplate';

interface CreativeTemplateProps {
  sections: ResumeSections;
}

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Helvetica',
    color: '#333',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#2a2a2a',
    color: 'white',
    padding: 20,
  },
  mainContent: {
    width: '70%',
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  title: {
    fontSize: 14,
    marginBottom: 15,
    color: '#cccccc',
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textTransform: 'uppercase',
    borderBottom: '1px solid #555',
    paddingBottom: 5,
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 5,
    color: '#cccccc',
  },
  link: {
    color: '#cccccc',
    textDecoration: 'none',
  },
  mainLink: {
    color: '#4a90e2',
    textDecoration: 'none',
  },
  section: {
    marginBottom: 20,
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4a90e2',
    textTransform: 'uppercase',
    borderBottom: '1px solid #eee',
    paddingBottom: 5,
  },
  sidebarSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textTransform: 'uppercase',
    borderBottom: '1px solid #555',
    paddingBottom: 5,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  skillsContainer: {
    marginBottom: 5,
  },
  skillCategory: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#cccccc',
  },
  skillItem: {
    fontSize: 10,
    marginBottom: 8,
    color: '#cccccc',
  },
  skillBar: {
    height: 4,
    backgroundColor: '#555',
    marginTop: 2,
  },
  skillFill: {
    height: 4,
    backgroundColor: '#4a90e2',
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  company: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  duration: {
    fontSize: 10,
    color: '#888',
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#444',
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.4,
    color: '#444',
  },
  bulletContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  educationItem: {
    marginBottom: 10,
  },
  institution: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  degree: {
    fontSize: 11,
    color: '#666',
  },
  dates: {
    fontSize: 10,
    color: '#888',
  },
  projectItem: {
    marginBottom: 12,
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
    color: '#444',
  },
  technologies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 3,
  },
  technologyItem: {
    fontSize: 9,
    backgroundColor: '#e6f2ff',
    padding: '2 4',
    marginRight: 4,
    marginBottom: 3,
    borderRadius: 2,
    color: '#4a90e2',
  },
  certificationItem: {
    marginBottom: 8,
  },
  certificationName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  certificationIssuer: {
    fontSize: 10,
    color: '#666',
  },
  certificationDate: {
    fontSize: 9,
    color: '#888',
  },
  awardItem: {
    marginBottom: 8,
  },
  awardTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  awardIssuer: {
    fontSize: 10,
    color: '#666',
  },
  awardYear: {
    fontSize: 9,
    color: '#888',
  },
  publicationItem: {
    marginBottom: 8,
  },
  publicationTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  publicationName: {
    fontSize: 10,
    color: '#666',
  },
  publicationDate: {
    fontSize: 9,
    color: '#888',
  },
  languageItem: {
    marginBottom: 8,
  },
  language: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#cccccc',
  },
  proficiency: {
    fontSize: 10,
    color: '#aaa',
  },
  proficiencyBar: {
    height: 4,
    backgroundColor: '#555',
    marginTop: 2,
    marginBottom: 8,
  },
  proficiencyFill: {
    height: 4,
    backgroundColor: '#4a90e2',
  },
  hobbyItem: {
    fontSize: 10,
    marginBottom: 5,
    color: '#cccccc',
  },
  customSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  customEntryItem: {
    marginBottom: 8,
  },
  customEntryOrg: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  customEntryRole: {
    fontSize: 10,
    color: '#666',
  },
  customEntryDesc: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#444',
  },
});

// Helper function to get proficiency percentage
const getProficiencyPercentage = (proficiency: string): string => {
  const proficiencyMap: { [key: string]: string } = {
    Native: '100%',
    Fluent: '90%',
    Advanced: '80%',
    Proficient: '70%',
    Intermediate: '50%',
    Basic: '30%',
    Beginner: '20%',
  };

  return proficiencyMap[proficiency] || '50%';
};

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ sections }) => {
  // Get job title from first work experience if available
  const jobTitle =
    sections.workExperience && sections.workExperience.data.length > 0
      ? sections.workExperience.data[0].title
      : 'Professional';

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Contact Information */}
          {sections.contactInfo && (
            <View style={styles.header}>
              <Text style={styles.name}>{sections.contactInfo.data.name}</Text>
              <Text style={styles.title}>{jobTitle}</Text>

              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Contact</Text>
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

          {/* Skills Section */}
          {sections.skills && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Skills</Text>
              {sections.skills.data.hardSkills &&
                sections.skills.data.hardSkills.length > 0 && (
                  <View style={styles.skillsContainer}>
                    <Text style={styles.skillCategory}>Technical Skills</Text>
                    {sections.skills.data.hardSkills.map((skill, index) => (
                      <View key={index} style={{ marginBottom: 6 }}>
                        <Text style={styles.skillItem}>{skill}</Text>
                        <View style={styles.skillBar}>
                          <View
                            style={[
                              styles.skillFill,
                              { width: `${Math.random() * 40 + 60}%` },
                            ]}
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              {sections.skills.data.softSkills &&
                sections.skills.data.softSkills.length > 0 && (
                  <View style={styles.skillsContainer}>
                    <Text style={styles.skillCategory}>Soft Skills</Text>
                    {sections.skills.data.softSkills.map((skill, index) => (
                      <View key={index} style={{ marginBottom: 6 }}>
                        <Text style={styles.skillItem}>{skill}</Text>
                        <View style={styles.skillBar}>
                          <View
                            style={[
                              styles.skillFill,
                              { width: `${Math.random() * 30 + 70}%` },
                            ]}
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                )}
            </View>
          )}

          {/* Languages Section */}
          {sections.languages && sections.languages.data.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Languages</Text>
              {sections.languages.data.map((lang, index) => (
                <View key={index} style={styles.languageItem}>
                  <Text style={styles.language}>{lang.language}</Text>
                  <Text style={styles.proficiency}>{lang.proficiency}</Text>
                  <View style={styles.proficiencyBar}>
                    <View
                      style={[
                        styles.proficiencyFill,
                        { width: getProficiencyPercentage(lang.proficiency) },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Hobbies Section */}
          {sections.hobbies && sections.hobbies.data.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Interests</Text>
              {sections.hobbies.data.map((hobby, index) => (
                <Text key={index} style={styles.hobbyItem}>
                  • {hobby}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Summary Section */}
          {sections.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <Text style={styles.summary}>
                {sections.summary.data.summary}
              </Text>
            </View>
          )}

          {/* Work Experience Section */}
          {sections.workExperience &&
            sections.workExperience.data.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Work Experience</Text>
                {sections.workExperience.data.map((job, index) => (
                  <View key={index} style={styles.experienceItem}>
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

          {/* Education Section */}
          {sections.education && sections.education.data.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {sections.education.data.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
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

          {/* Projects Section */}
          {sections.projects && sections.projects.data.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {sections.projects.data.map((project, index) => (
                <View key={index} style={styles.projectItem}>
                  <View style={styles.projectHeader}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    {project.url && (
                      <Link src={project.url} style={styles.mainLink}>
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

          {/* Certifications Section */}
          {sections.certifications &&
            sections.certifications.data.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {sections.certifications.data.map((cert, index) => (
                  <View key={index} style={styles.certificationItem}>
                    <View style={styles.projectHeader}>
                      <Text style={styles.certificationName}>{cert.name}</Text>
                      {cert.url && (
                        <Link src={cert.url} style={styles.mainLink}>
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

          {/* Awards Section */}
          {sections.awards && sections.awards.data.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Awards & Honors</Text>
              {sections.awards.data.map((award, index) => (
                <View key={index} style={styles.awardItem}>
                  <Text style={styles.awardTitle}>{award.title}</Text>
                  <Text style={styles.awardIssuer}>{award.issuer}</Text>
                  <Text style={styles.awardYear}>{award.year}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Publications Section */}
          {sections.publications && sections.publications.data.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Publications</Text>
              {sections.publications.data.map((pub, index) => (
                <View key={index} style={styles.publicationItem}>
                  <View style={styles.projectHeader}>
                    <Text style={styles.publicationTitle}>{pub.title}</Text>
                    {pub.url && (
                      <Link src={pub.url} style={styles.mainLink}>
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

          {/* Custom Sections */}
          {sections.customSection && sections.customSection.data.length > 0 && (
            <View style={styles.section}>
              {sections.customSection.data.map((customSec, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={styles.sectionTitle}>
                    {customSec.sectionTitle}
                  </Text>
                  {customSec.entries.map((entry, idx) => (
                    <View key={idx} style={styles.customEntryItem}>
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
      </View>
    </View>
  );
};

export default CreativeTemplate;
