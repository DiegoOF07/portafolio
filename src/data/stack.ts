import vueLogo from '@/assets/logos/vue.svg'
import tsLogo from '@/assets/logos/typescript.svg'
import jsLogo from '@/assets/logos/javascript.svg'
import viteLogo from '@/assets/logos/vite.svg'
import reactLogo from '@/assets/logos/react.svg'
import goLogo from '@/assets/logos/go.svg'
import postgresLogo from '@/assets/logos/postgresql.svg'
import pythonLogo from '@/assets/logos/python.svg'
import cplusLogo from '@/assets/logos/cplusplus.svg'
import javaLogo from '@/assets/logos/java.svg'
import dockerLogo from '@/assets/logos/docker.svg'
import rustLogo from '@/assets/logos/rust.svg'
import neo4jLogo from '@/assets/logos/neo4j.svg'
import supabaseLogo from '@/assets/logos/supabase.svg'
import gcpLogo from '@/assets/logos/gcp.svg'
import type { TechRef } from './projects'

export interface StackGroup {
  label: string
  items: TechRef[]
}

// Agrupado igual que en el CV: Lenguajes / Frontend / Backend / Bases de datos / Herramientas
export const stackGroups: StackGroup[] = [
  {
    label: 'Lenguajes',
    items: [
      { name: 'Go', icon: goLogo },
      { name: 'TypeScript', icon: tsLogo },
      { name: 'JavaScript', icon: jsLogo },
      { name: 'Python', icon: pythonLogo },
      { name: 'C++', icon: cplusLogo },
      { name: 'Java', icon: javaLogo },
      { name: 'Rust', icon: rustLogo },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'Vue', icon: vueLogo },
      { name: 'React', icon: reactLogo },
      { name: 'Vite', icon: viteLogo },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Go', icon: goLogo },
    ],
  },
  {
    label: 'Bases de datos',
    items: [
      { name: 'PostgreSQL', icon: postgresLogo },
      { name: 'Neo4j', icon: neo4jLogo },
      { name: 'Supabase', icon: supabaseLogo },
    ],
  },
  {
    label: 'Herramientas',
    items: [
      { name: 'Docker', icon: dockerLogo },
      { name: 'Google Cloud Platform', icon: gcpLogo },
    ],
  },
]
