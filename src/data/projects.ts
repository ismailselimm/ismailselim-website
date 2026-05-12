import type { Project } from '../types'

// Vitrin sıfırdan kurulacak — yeni proje listesi geldiğinde buraya eklenir.
// Her proje için:
//   - cover: /portfolio/{id}/cover.{ext} altına asset koy
//   - gallery: aynı klasörde sıralı görseller
//   - link.href: prod URL (opsiyonel)
export const projects: Project[] = []
