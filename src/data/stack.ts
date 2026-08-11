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
      { name: 'Rust' }, // TODO: agregar logo de Rust
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
      { name: 'Neo4j' }, // TODO: agregar logo de Neo4j
      { name: 'Supabase' }, // TODO: agregar logo de Supabase
    ],
  },
  {
    label: 'Herramientas',
    items: [
      { name: 'Docker', icon: dockerLogo },
      { name: 'Google Cloud Platform' }, // TODO: agregar logo de GCP
    ],
  },
]
