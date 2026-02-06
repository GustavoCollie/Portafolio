import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from '@react-pdf/renderer';
import { ResumeData } from '../../../../application/dtos/ResumeData';

const colors = {
  primary: '#1a365d',
  secondary: '#2d3748',
  accent: '#3182ce',
  text: '#1a202c',
  muted: '#718096',
  background: '#ffffff',
  border: '#e2e8f0',
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: colors.text,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: colors.accent,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  contactItem: {
    fontSize: 9,
    color: colors.muted,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: colors.secondary,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  dateRange: {
    fontSize: 9,
    color: colors.muted,
  },
  role: {
    fontSize: 10,
    color: colors.accent,
    marginBottom: 4,
  },
  achievement: {
    fontSize: 9,
    marginLeft: 10,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  bulletPoint: {
    width: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillCategory: {
    marginBottom: 6,
  },
  skillCategoryTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 2,
  },
  skillList: {
    fontSize: 9,
    color: colors.muted,
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 20,
  },
  column: {
    flex: 1,
  },
  educationItem: {
    marginBottom: 8,
  },
  institution: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  degree: {
    fontSize: 9,
    color: colors.text,
  },
  link: {
    color: colors.accent,
    textDecoration: 'none',
  },
});

interface ResumeDocumentProps {
  data: ResumeData;
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.contact.fullName}</Text>
        <Text style={styles.title}>{data.contact.title}</Text>
        <View style={styles.contactRow}>
          <Text style={styles.contactItem}>{data.contact.email}</Text>
          {data.contact.phone && (
            <Text style={styles.contactItem}>{data.contact.phone}</Text>
          )}
          <Text style={styles.contactItem}>{data.contact.location}</Text>
          {data.contact.linkedin && (
            <Link src={data.contact.linkedin} style={styles.link}>
              <Text style={styles.contactItem}>LinkedIn</Text>
            </Link>
          )}
          {data.contact.github && (
            <Link src={data.contact.github} style={styles.link}>
              <Text style={styles.contactItem}>GitHub</Text>
            </Link>
          )}
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summary}>{data.summary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {data.experiences.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <Text style={styles.companyName}>{exp.company}</Text>
              <Text style={styles.dateRange}>{exp.dateRange}</Text>
            </View>
            <Text style={styles.role}>{exp.role}</Text>
            {exp.achievements.map((achievement, i) => (
              <View key={i} style={{ flexDirection: 'row' }}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.achievement}>{achievement}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Skills - Two Column */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <Text style={{ ...styles.skillCategoryTitle, marginBottom: 4 }}>
              Technical Skills
            </Text>
            {data.technicalSkills.map((cat, index) => (
              <View key={index} style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>{cat.category}:</Text>
                <Text style={styles.skillList}>{cat.skills.join(', ')}</Text>
              </View>
            ))}
          </View>
          <View style={styles.column}>
            <Text style={{ ...styles.skillCategoryTitle, marginBottom: 4 }}>
              Business Skills
            </Text>
            {data.businessSkills.map((cat, index) => (
              <View key={index} style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>{cat.category}:</Text>
                <Text style={styles.skillList}>{cat.skills.join(', ')}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Education & Certifications - Two Column */}
      <View style={styles.twoColumn}>
        <View style={styles.column}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.degree}>
                  {edu.degree} in {edu.field}
                </Text>
                <Text style={styles.dateRange}>{edu.year}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.institution}>{cert.name}</Text>
                <Text style={styles.degree}>{cert.issuer}</Text>
                <Text style={styles.dateRange}>{cert.date}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
