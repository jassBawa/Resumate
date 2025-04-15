import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { ResumeSections } from '@/config/parseSections';

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.cdnfonts.com/s/29107/Helvetica.woff' },
    { src: 'https://fonts.cdnfonts.com/s/29107/Helvetica-Bold.woff', fontWeight: 'bold' },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  subheader: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#000000',
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
    color: '#000000',
  },
  link: {
    fontSize: 12,
    marginBottom: 4,
    color: '#2563eb',
    textDecoration: 'underline',
  },
  contactInfo: {
    marginBottom: 20,
    borderBottom: '1 solid #e5e7eb',
    paddingBottom: 20,
  },
  experienceItem: {
    marginBottom: 15,
    paddingLeft: 10,
    borderLeft: '2 solid #e5e7eb',
  },
  skillTag: {
    backgroundColor: '#f3f4f6',
    padding: '2 6',
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  bulletPoint: {
    marginLeft: 10,
    marginBottom: 4,
  },
});

interface ResumePDFProps {
  sections: ResumeSections;
}

const ResumePDF: React.FC<ResumePDFProps> = ({ sections }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Contact Information */}
        {sections.contactInfo && (
          <View style={styles.contactInfo}>
            <Text style={styles.header}>{sections.contactInfo.data.name}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {sections.contactInfo.data.email && (
                <Link src={`mailto:${sections.contactInfo.data.email}`} style={styles.link}>
                  {sections.contactInfo.data.email}
                </Link>
              )}
              {sections.contactInfo.data.phone && (
                <Link src={`tel:${sections.contactInfo.data.phone}`} style={styles.link}>
                  {sections.contactInfo.data.phone}
                </Link>
              )}
              {sections.contactInfo.data.location && (
                <Text style={styles.text}>{sections.contactInfo.data.location}</Text>
              )}
              {sections.contactInfo.data.linkedin && (
                <Link src={sections.contactInfo.data.linkedin} style={styles.link}>
                  LinkedIn
                </Link>
              )}
            </View>
          </View>
        )}

        {/* Summary */}
        {sections.summary && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Professional Summary</Text>
            <Text style={styles.text}>{sections.summary.data.summary}</Text>
          </View>
        )}

        {/* Skills */}
        {sections.skills && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Skills</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
              {sections.skills.data.hardSkills.map((skill, index) => (
                <Text key={index} style={[styles.text, styles.skillTag]}>
                  {skill}
                </Text>
              ))}
            </View>
            {sections.skills.data.softSkills && (
              <View style={{ marginTop: 8 }}>
                <Text style={styles.sectionTitle}>Soft Skills</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                  {sections.skills.data.softSkills.map((skill, index) => (
                    <Text key={index} style={[styles.text, styles.skillTag]}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Work Experience */}
        {sections.workExperience && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Work Experience</Text>
            {sections.workExperience.data.map((job, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.sectionTitle}>{job.title}</Text>
                <Text style={styles.text}>{job.company}</Text>
                <Text style={styles.text}>{job.duration}</Text>
                {job.description && <Text style={styles.text}>{job.description}</Text>}
                {job.achievements && (
                  <View style={{ marginTop: 4 }}>
                    {job.achievements.map((achievement, idx) => (
                      <Text key={idx} style={[styles.text, styles.bulletPoint]}>
                        • {achievement}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {sections.education && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Education</Text>
            {sections.education.data.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.sectionTitle}>{edu.degree}</Text>
                <Text style={styles.text}>{edu.institution}</Text>
                <Text style={styles.text}>{edu.startDate} - {edu.endDate}</Text>
                {(edu.cgpa || edu.percentage) && (
                  <View style={{ marginTop: 4 }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                      {edu.cgpa && <Text style={styles.text}>CGPA: {edu.cgpa}</Text>}
                      {edu.percentage && <Text style={styles.text}>Percentage: {edu.percentage}</Text>}
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {sections.projects && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Projects</Text>
            {sections.projects.data.map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.sectionTitle}>{project.name}</Text>
                <Text style={styles.text}>{project.description}</Text>
                {project.technologies && (
                  <View style={{ marginTop: 4 }}>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>Technologies Used:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 2 }}>
                      {project.technologies.map((tech, idx) => (
                        <Text key={idx} style={[styles.text, styles.skillTag]}>
                          {tech}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {project.url && (
                  <Link src={project.url} style={styles.link}>
                    View Project
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {sections.certifications && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Certifications</Text>
            {sections.certifications.data.map((cert, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.sectionTitle}>{cert.name}</Text>
                <Text style={styles.text}>Issuer: {cert.issuer}</Text>
                <Text style={styles.text}>Date: {cert.date}</Text>
                {cert.url && (
                  <Link src={cert.url} style={styles.link}>
                    Verify Certification
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Awards */}
        {sections.awards && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Awards & Achievements</Text>
            {sections.awards.data.map((award, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.sectionTitle}>{award.title}</Text>
                <Text style={styles.text}>Issuer: {award.issuer}</Text>
                <Text style={styles.text}>Year: {award.year}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Publications */}
        {sections.publications && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Publications</Text>
            {sections.publications.data.map((pub, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.sectionTitle}>{pub.title}</Text>
                <Text style={styles.text}>Publication: {pub.publication}</Text>
                <Text style={styles.text}>Date: {pub.date}</Text>
                {pub.url && (
                  <Link src={pub.url} style={styles.link}>
                    View Publication
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {sections.languages && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Languages</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {sections.languages.data.map((lang, index) => (
                <Text key={index} style={styles.text}>
                  {lang.language} ({lang.proficiency})
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Hobbies */}
        {sections.hobbies && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Hobbies & Interests</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
              {sections.hobbies.data.map((hobby, index) => (
                <Text key={index} style={[styles.text, styles.skillTag]}>
                  {hobby}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Custom Section */}
        {sections.customSection && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Additional Information</Text>
            {sections.customSection.data.map((section, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.sectionTitle}>{section.sectionTitle}</Text>
                {section.entries.map((entry, idx) => (
                  <View key={idx} style={{ marginBottom: 8 }}>
                    {entry.organization && <Text style={styles.text}>Organization: {entry.organization}</Text>}
                    {entry.role && <Text style={styles.text}>Role: {entry.role}</Text>}
                    {entry.description && <Text style={styles.text}>{entry.description}</Text>}
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF; 