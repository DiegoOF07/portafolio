import vueLogo from '@/assets/logos/vue.svg'
import tsLogo from '@/assets/logos/typescript.svg'
import jsLogo from '@/assets/logos/javascript.svg'
import viteLogo from '@/assets/logos/vite.svg'
import reactLogo from '@/assets/logos/react.svg'
import goLogo from '@/assets/logos/go.svg'
import postgresLogo from '@/assets/logos/postgresql.svg'
import sqliteLogo from '@/assets/logos/sqlite.svg'
import pythonLogo from '@/assets/logos/python.svg'
import javaLogo from '@/assets/logos/java.svg'
import dockerLogo from '@/assets/logos/docker.svg'
import rustLogo from '@/assets/logos/rust.svg'
import neo4jLogo from '@/assets/logos/neo4j.svg'
import supabaseLogo from '@/assets/logos/supabase.svg'
import gcpLogo from '@/assets/logos/gcp.svg'
import type { Localized } from '@/i18n'
import type { TechRef } from './projects'

export interface StackGroup {
  label: Localized
  items: TechRef[]
}

// Igual que las aptitudes del CV
export const stackGroups: StackGroup[] = [
  {
    label: { es: 'Lenguajes', en: 'Languages' },
    items: [
      { name: 'Go', icon: goLogo },
      { name: 'TypeScript', icon: tsLogo },
      { name: 'JavaScript', icon: jsLogo },
      { name: 'Python', icon: pythonLogo },
      { name: 'Rust', icon: rustLogo },
      { name: 'Java', icon: javaLogo },
      { name: 'C' },
    ],
  },
  {
    label: { es: 'Frontend', en: 'Frontend' },
    items: [
      { name: 'Vue', icon: vueLogo },
      { name: 'React', icon: reactLogo },
      { name: 'Vite', icon: viteLogo },
    ],
  },
  {
    label: { es: 'Backend', en: 'Backend' },
    items: [
      { name: 'Go', icon: goLogo },
      { name: 'FastAPI' },
      { name: 'Node.js/Express' },
      { name: 'REST APIs' },
      { name: 'Model Context Protocol' },
    ],
  },
  {
    label: { es: 'Bases de datos', en: 'Databases' },
    items: [
      { name: 'PostgreSQL', icon: postgresLogo },
      { name: 'SQLite', icon: sqliteLogo },
      { name: 'Neo4j', icon: neo4jLogo },
      { name: 'MongoDB' },
      { name: 'MySQL' },
      { name: 'Supabase', icon: supabaseLogo },
    ],
  },
  {
    label: { es: 'Herramientas', en: 'Tools' },
    items: [
      { name: 'Git' },
      { name: 'GitHub Actions' },
      { name: 'Docker', icon: dockerLogo },
      { name: 'Linux' },
      { name: 'AWS' },
      { name: 'Google Cloud', icon: gcpLogo },
      { name: 'Jira' },
      { name: 'Scrum' },
    ],
  },
]
