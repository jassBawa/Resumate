import React from 'react';
import { Document, Page, Text, View, Link } from '@react-pdf/renderer';
import { ResumeSections } from '@/config/parseSections';
import { templateStyles } from './styles/index';

// No need to register fonts as we'll use built-in PDF fonts

interface ResumePDFProps {
  sections: ResumeSections;
  template: 'modern' | 'classic' | 'minimal' | 'creative';
}

export function ResumePDF({ sections, template }: ResumePDFProps) {
  const styles = templateStyles[template];
  const isCreative = template === 'creative';

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.name}>{sections.contactInfo?.data.name}</Text>
      <View style={styles.contactInfo}>
        <Text>{sections.contactInfo?.data.email}</Text>
        <Text>{sections.contactInfo?.data.phone}</Text>
        <Text>{sections.contactInfo?.data.location}</Text>
        {sections.contactInfo?.data.linkedin && (
          <Link src={sections.contactInfo.data.linkedin} style={styles.link}>
            LinkedIn
          </Link>
        )}
      </View>
    </View>
  );

  const renderSkills = () => (
    sections.skills?.data && (
      <View style={styles.section}>
        <Text style={isCreative ? styles.sectionTitle : styles.sectionTitle}>Skills</Text>
        <View style={styles.skills}>
          {sections.skills.data.hardSkills.map((skill, index) => (
            <Text key={index} style={styles.skill}>
              {skill}
            </Text>
          ))}
        </View>
      </View>
    )
  );

  const renderWorkExperience = () => (
    sections.workExperience?.data && (
      <View style={styles.section}>
        <Text style={isCreative ? styles.mainSectionTitle : styles.sectionTitle}>
          Work Experience
        </Text>
        {sections.workExperience.data.map((job, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <View>
                <Text style={isCreative ? styles.mainTitle : styles.title}>{job.title}</Text>
                <Text style={isCreative ? styles.mainSubtitle : styles.subtitle}>{job.company}</Text>
              </View>
              <Text style={isCreative ? styles.mainDuration : styles.duration}>{job.duration}</Text>
            </View>
            {job.description && (
              <Text style={isCreative ? styles.mainDescription : styles.description}>
                {job.description}
              </Text>
            )}
            {job.achievements && job.achievements.length > 0 && (
              <View style={{ marginTop: 4 }}>
                {job.achievements.map((achievement, idx) => (
                  <Text key={idx} style={isCreative ? styles.mainDescription : styles.description}>
                    • {achievement}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    )
  );

  const renderEducation = () => (
    sections.education?.data && (
      <View style={styles.section}>
        <Text style={isCreative ? styles.mainSectionTitle : styles.sectionTitle}>Education</Text>
        {sections.education.data.map((edu, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <View>
                <Text style={isCreative ? styles.mainTitle : styles.title}>{edu.degree}</Text>
                <Text style={isCreative ? styles.mainSubtitle : styles.subtitle}>{edu.institution}</Text>
              </View>
              <Text style={isCreative ? styles.mainDuration : styles.duration}>
                {edu.startDate} - {edu.endDate}
              </Text>
            </View>
            {(edu.cgpa || edu.percentage) && (
              <Text style={isCreative ? styles.mainDescription : styles.description}>
                {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
              </Text>
            )}
          </View>
        ))}
      </View>
    )
  );

  const renderProjects = () => (
    sections.projects?.data && (
      <View style={styles.section}>
        <Text style={isCreative ? styles.mainSectionTitle : styles.sectionTitle}>Projects</Text>
        {sections.projects.data.map((project, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <View>
                <Text style={isCreative ? styles.mainTitle : styles.title}>{project.name}</Text>
              </View>
            </View>
            <Text style={isCreative ? styles.mainDescription : styles.description}>
              {project.description}
            </Text>
            {project.technologies && project.technologies.length > 0 && (
              <Text style={isCreative ? styles.mainTechnologies : styles.technologies}>
                Technologies: {project.technologies.join(', ')}
              </Text>
            )}
            {project.url && (
              <Link src={project.url} style={isCreative ? styles.mainLink : styles.link}>
                View Project
              </Link>
            )}
          </View>
        ))}
      </View>
    )
  );

  if (template === 'creative') {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
            {/* Sidebar */}
            <View style={styles.sidebar}>
              {renderHeader()}
              {renderSkills()}
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
              {sections.summary?.data && (
                <View style={styles.section}>
                  <Text style={styles.mainSectionTitle}>Summary</Text>
                  <Text style={styles.mainDescription}>{sections.summary.data.summary}</Text>
                </View>
              )}
              {renderWorkExperience()}
              {renderEducation()}
              {renderProjects()}
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        {sections.summary?.data && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.description}>{sections.summary.data.summary}</Text>
          </View>
        )}
        {renderSkills()}
        {renderWorkExperience()}
        {renderEducation()}
        {renderProjects()}
      </Page>
    </Document>
  );
}

export default ResumePDF; 