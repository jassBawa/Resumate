export interface BaseStyles {
  page: {
    padding: number | string;
    backgroundColor: string;
    fontFamily: string;
  };
  header: {
    marginBottom: number;
    borderBottom?: string;
    paddingBottom?: number;
  };
  name: {
    fontSize: number;
    fontWeight: string;
    color: string;
    marginBottom: number;
    textAlign?: string;
    textTransform?: string;
    letterSpacing?: number;
  };
  contactInfo: {
    fontSize: number;
    color: string;
    flexDirection: string;
    justifyContent?: string;
    gap?: number | string;
    marginBottom?: number;
  };
  section: {
    marginBottom: number;
  };
  sectionTitle: {
    fontSize: number;
    fontWeight: string;
    color: string;
    marginBottom: number;
    borderBottom?: string;
    paddingBottom?: number;
    textTransform?: string;
    letterSpacing?: number;
  };
  item: {
    marginBottom: number;
  };
  itemHeader: {
    flexDirection: string;
    justifyContent: string;
    marginBottom: number;
    alignItems?: string;
  };
  title: {
    fontSize: number;
    fontWeight: string;
    color: string;
  };
  subtitle: {
    fontSize: number;
    color: string;
  };
  duration: {
    fontSize: number;
    color: string;
  };
  description: {
    fontSize: number;
    color: string;
    marginTop: number;
    lineHeight?: number;
  };
  skills: {
    flexDirection: string;
    flexWrap: string;
    gap: number | string;
    marginTop?: number;
  };
  skill: {
    fontSize: number;
    color: string;
    backgroundColor: string;
    padding: string;
    borderRadius: number;
  };
  technologies: {
    fontSize: number;
    color: string;
    marginTop: number;
  };
  link: {
    fontSize: number;
    color: string;
    textDecoration: string;
  };
}

export interface CreativeStyles extends BaseStyles {
  container: {
    flexDirection: string;
    width: string;
    height: string;
  };
  sidebar: {
    width: string;
    backgroundColor: string;
    color: string;
    padding: number;
    minHeight: string;
  };
  mainContent: {
    width: string;
    padding: string | number;
    backgroundColor: string;
  };
  mainSectionTitle: {
    fontSize: number;
    fontWeight: string;
    color: string;
    marginBottom: number;
    textTransform?: string;
    letterSpacing?: number;
  };
  mainTitle: {
    fontSize: number;
    fontWeight: string;
    color: string;
  };
  mainSubtitle: {
    fontSize: number;
    color: string;
  };
  mainDuration: {
    fontSize: number;
    color: string;
  };
  mainDescription: {
    fontSize: number;
    color: string;
    marginTop: number;
    lineHeight?: number;
  };
  mainTechnologies: {
    fontSize: number;
    color: string;
    marginTop: number;
  };
  mainLink: {
    fontSize: number;
    color: string;
    textDecoration: string;
  };
}

export type TemplateStyles = {
  modern: BaseStyles;
  classic: BaseStyles;
  minimal: BaseStyles;
  creative: CreativeStyles;
}; 