import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const colors = {
    primary: '#4F46E5',
    primaryDark: '#4338CA',
    dark: '#0F172A',
    heading: '#1E293B',
    subheading: '#334155',
    body: '#475569',
    muted: '#64748B',
    light: '#94A3B8',
    border: '#E2E8F0',
    bgLight: '#F1F5F9',
    white: '#FFFFFF',
};

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: colors.white,
        paddingTop: 25,
        paddingBottom: 25,
        paddingHorizontal: 30,
        fontFamily: 'Helvetica',
    },
    // Header
    header: {
        flexDirection: 'row',
        marginBottom: 14,
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
        paddingBottom: 14,
    },
    headerLeft: {
        flexGrow: 1,
    },
    headerRight: {
        width: 75,
        height: 75,
        marginLeft: 15,
    },
    avatar: {
        width: 75,
        height: 75,
        borderRadius: 38,
        objectFit: 'cover',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.heading,
        marginBottom: 2,
    },
    title: {
        fontSize: 12,
        color: colors.primary,
        marginBottom: 6,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 2,
    },
    contactInfo: {
        fontSize: 9,
        color: colors.muted,
    },
    summary: {
        fontSize: 9,
        color: colors.body,
        lineHeight: 1.4,
        marginTop: 6,
        textAlign: 'justify',
    },
    // Sections
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.subheading,
        borderBottomWidth: 1.5,
        borderBottomColor: colors.primary,
        marginBottom: 7,
        paddingBottom: 2,
        textTransform: 'uppercase',
    },
    // Experience
    experienceItem: {
        marginBottom: 8,
    },
    expRole: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.dark,
    },
    expRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    expCompany: {
        fontSize: 10,
        color: colors.primaryDark,
    },
    expDate: {
        fontSize: 8,
        color: colors.light,
    },
    expDesc: {
        fontSize: 9,
        color: colors.body,
        lineHeight: 1.3,
    },
    bulletItem: {
        fontSize: 8,
        color: colors.body,
        lineHeight: 1.3,
        marginLeft: 5,
        marginTop: 1,
    },
    // Education
    eduItem: {
        marginBottom: 5,
    },
    eduDegree: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.dark,
    },
    eduInstitution: {
        fontSize: 9,
        color: colors.primaryDark,
    },
    eduYear: {
        fontSize: 8,
        color: colors.light,
    },
    // Skills
    skillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    skillBadge: {
        backgroundColor: colors.bgLight,
        padding: '2 7',
        borderRadius: 6,
        fontSize: 8,
        color: colors.subheading,
    },
    // Projects
    projectItem: {
        marginBottom: 6,
    },
    projectTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.heading,
    },
    projectDesc: {
        fontSize: 8,
        color: colors.muted,
        lineHeight: 1.3,
    },
    projectTech: {
        fontSize: 7,
        color: colors.primary,
        marginTop: 1,
    },
    // Certifications & Languages
    certItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    certName: {
        fontSize: 9,
        color: colors.dark,
    },
    certIssuer: {
        fontSize: 8,
        color: colors.light,
    },
    langRow: {
        flexDirection: 'row',
        gap: 20,
    },
    langItem: {
        fontSize: 9,
        color: colors.body,
    },
    // Two-column layout
    columnsRow: {
        flexDirection: 'row',
        gap: 15,
    },
    columnLeft: {
        flex: 1,
    },
    columnRight: {
        flex: 1,
    },
});

interface CVProps {
    data: any;
    avatarBase64?: string;
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

export const CVDocument: React.FC<CVProps> = ({ data, avatarBase64 }) => {
    const { profile, experiences, skills, projects } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.name}>{profile.fullName}</Text>
                        <Text style={styles.title}>{profile.title}</Text>
                        <View style={styles.contactRow}>
                            <Text style={styles.contactInfo}>{profile.email}</Text>
                            <Text style={styles.contactInfo}>|</Text>
                            <Text style={styles.contactInfo}>{profile.phone}</Text>
                            <Text style={styles.contactInfo}>|</Text>
                            <Text style={styles.contactInfo}>{profile.location}</Text>
                        </View>
                        <Text style={styles.contactInfo}>{profile.socialLinks.linkedin}</Text>
                        <Text style={styles.summary}>{profile.summary}</Text>
                    </View>
                    <View style={styles.headerRight}>
                        {avatarBase64 ? (
                            /* eslint-disable-next-line jsx-a11y/alt-text */
                            <Image src={avatarBase64} style={styles.avatar} />
                        ) : null}
                    </View>
                </View>

                {/* Experience */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experiencia Profesional</Text>
                    {experiences.map((exp: any) => (
                        <View key={exp.id} style={styles.experienceItem}>
                            <Text style={styles.expRole}>{exp.role}</Text>
                            <View style={styles.expRow}>
                                <Text style={styles.expCompany}>{exp.company}</Text>
                                <Text style={styles.expDate}>
                                    {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Presente'}
                                </Text>
                            </View>
                            <Text style={styles.expDesc}>{exp.description}</Text>
                            {exp.achievements && exp.achievements.length > 0 && (
                                <View style={{ marginTop: 2 }}>
                                    {exp.achievements.slice(0, 2).map((ach: string, idx: number) => (
                                        <Text key={idx} style={styles.bulletItem}>{'\u2022'} {ach}</Text>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                {/* Two-column: Education + Certifications */}
                <View style={styles.columnsRow}>
                    <View style={styles.columnLeft}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Educacion</Text>
                            {profile.education.map((edu: any, idx: number) => (
                                <View key={idx} style={styles.eduItem}>
                                    <Text style={styles.eduDegree}>{edu.degree} en {edu.field}</Text>
                                    <Text style={styles.eduInstitution}>{edu.institution}</Text>
                                    <Text style={styles.eduYear}>{edu.startYear}{edu.endYear !== edu.startYear ? ` - ${edu.endYear}` : ''}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.columnRight}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Certificaciones</Text>
                            {profile.certifications.map((cert: any, idx: number) => (
                                <View key={idx} style={styles.certItem}>
                                    <View>
                                        <Text style={styles.certName}>{cert.name}</Text>
                                        <Text style={styles.certIssuer}>{cert.issuer}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Skills */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Habilidades</Text>
                    <View style={styles.skillContainer}>
                        {skills.map((skill: any) => (
                            <View key={skill.id} style={styles.skillBadge}>
                                <Text>{skill.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Projects */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Proyectos Destacados</Text>
                    {projects.map((proj: any) => (
                        <View key={proj.id} style={styles.projectItem}>
                            <Text style={styles.projectTitle}>{proj.title}</Text>
                            <Text style={styles.projectDesc}>{proj.description}</Text>
                            <Text style={styles.projectTech}>{proj.technologies.join(' | ')}</Text>
                        </View>
                    ))}
                </View>

                {/* Languages */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Idiomas</Text>
                    <View style={styles.langRow}>
                        {profile.languages.map((lang: any, idx: number) => (
                            <Text key={idx} style={styles.langItem}>{lang.name}: {lang.level}</Text>
                        ))}
                    </View>
                </View>

            </Page>
        </Document>
    );
};
