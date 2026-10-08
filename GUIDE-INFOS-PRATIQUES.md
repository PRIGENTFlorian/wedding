# Informations pratiques — mode d’emploi

Ouvrir `script.js` et rechercher `const practicalInfos = [`.

Chaque objet représente une carte. Les propriétés disponibles sont :
- `id` : identifiant unique
- `title` : titre affiché
- `description` : texte affiché
- `image` : chemin vers une illustration (ex. `assets/infos/parking.png`) ; laisser `""` pour une icône
- `icon` : symbole utilisé en l’absence d’image
- `alt` : description de l’illustration pour l’accessibilité
- `action` : lien facultatif, ex. `{ label: "Voir le plan", url: "https://example.com" }`

Pour ajouter une carte, dupliquez un objet dans le tableau, changez son `id`, puis renseignez son contenu. Les cartes se réorganisent automatiquement : 1 colonne sur téléphone, 2 sur tablette et jusqu’à 4 sur grand écran.

Placez vos illustrations dans `assets/infos/`. Des fichiers PNG avec vraie transparence ou WebP sont recommandés. Aucune illustration n’est imposée : les quatre cartes actuelles conservent un symbole en attendant vos fichiers.
