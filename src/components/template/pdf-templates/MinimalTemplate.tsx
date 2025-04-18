// components/MinimalTemplate.tsx
import React from 'react';
import { Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import type { ResumeSections } from '@/config/parseSections';

interface MinimalTemplateProps {
  sections: ResumeSections;
}

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica' },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  text: { fontSize: 10, marginBottom: 4 },
  link: { fontSize: 10, color: 'blue', textDecoration: 'none' },
  section: { marginBottom: 12 },
});

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ sections }) => {
  const jobTitle = sections.workExperience?.data[0]?.title || 'Professional';

  return (
    <View style={styles.page}>
      {/* Header */}
      {sections.contactInfo && (
        <View style={styles.section}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {sections.contactInfo.data.name}
          </Text>
          <Text style={styles.text}>{jobTitle}</Text>
          <Text style={styles.text}>{sections.contactInfo.data.email}</Text>
          <Text style={styles.text}>{sections.contactInfo.data.phone}</Text>
          <Text style={styles.text}>{sections.contactInfo.data.location}</Text>
          {sections.contactInfo.data.linkedin && (
            <Link src={sections.contactInfo.data.linkedin} style={styles.link}>
              LinkedIn
            </Link>
          )}
        </View>
      )}

      {/* Summary */}
      {sections.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.text}>{sections.summary.data.summary}</Text>
        </View>
      )}

      {/* Work Experience */}
      {sections.workExperience && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {sections.workExperience.data.map((job, i) => (
            <View key={i}>
              <Text style={styles.text}>
                {job.title} - {job.company}
              </Text>
              <Text style={styles.text}>{job.duration}</Text>
              <Text style={styles.text}>{job.description}</Text>
              {job.responsibilities?.map((item, idx) => (
                <Text key={idx} style={styles.text}>
                  • {item}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {sections.education && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {sections.education.data.map((edu, i) => (
            <View key={i}>
              <Text style={styles.text}>{edu.institution}</Text>
              <Text style={styles.text}>{edu.degree}</Text>
              <Text style={styles.text}>
                {edu.startDate} - {edu.endDate}
              </Text>
              {edu.cgpa && <Text style={styles.text}>CGPA: {edu.cgpa}</Text>}
              {edu.percentage && (
                <Text style={styles.text}>Percentage: {edu.percentage}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {sections.projects && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {sections.projects.data.map((proj, i) => (
            <View key={i}>
              <Text style={styles.text}>{proj.name}</Text>
              <Text style={styles.text}>{proj.description}</Text>
              {proj.url && (
                <Link src={proj.url} style={styles.link}>
                  View Project
                </Link>
              )}
              {proj.technologies && proj.technologies?.length > 0 && (
                <Text style={styles.text}>
                  Tech: {proj.technologies.join(', ')}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {sections.skills && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {sections.skills.data.hardSkills && (
            <Text style={styles.text}>
              Hard: {sections.skills.data.hardSkills.join(', ')}
            </Text>
          )}
          {sections.skills.data.softSkills && (
            <Text style={styles.text}>
              Soft: {sections.skills.data.softSkills.join(', ')}
            </Text>
          )}
        </View>
      )}

      {/* Languages */}
      {sections.languages && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          {sections.languages.data.map((lang, i) => (
            <Text key={i} style={styles.text}>
              {lang.language} - {lang.proficiency}
            </Text>
          ))}
        </View>
      )}

      {/* Certifications */}
      {sections.certifications && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {sections.certifications.data.map((cert, i) => (
            <View key={i}>
              <Text style={styles.text}>{cert.name}</Text>
              <Text style={styles.text}>{cert.issuer}</Text>
              <Text style={styles.text}>{cert.date}</Text>
              {cert.url && (
                <Link src={cert.url} style={styles.link}>
                  View
                </Link>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Awards */}
      {sections.awards && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Awards</Text>
          {sections.awards.data.map((award, i) => (
            <View key={i}>
              <Text style={styles.text}>{award.title}</Text>
              <Text style={styles.text}>{award.issuer}</Text>
              <Text style={styles.text}>{award.year}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Hobbies */}
      {sections.hobbies && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hobbies</Text>
          {sections.hobbies.data.map((hobby, i) => (
            <Text key={i} style={styles.text}>
              • {hobby}
            </Text>
          ))}
        </View>
      )}

      {/* Custom Section */}
      {sections.customSection && (
        <View style={styles.section}>
          {sections.customSection.data.map((custom, i) => (
            <View key={i}>
              <Text style={styles.sectionTitle}>{custom.sectionTitle}</Text>
              {custom.entries.map((entry, j) => (
                <View key={j}>
                  {entry.organization && (
                    <Text style={styles.text}>{entry.organization}</Text>
                  )}
                  {entry.role && <Text style={styles.text}>{entry.role}</Text>}
                  {entry.description && (
                    <Text style={styles.text}>{entry.description}</Text>
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
export default MinimalTemplate;