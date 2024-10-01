import type { IAddressEnterprise } from "./IAddressEnterprise"
import type { ICoordonnee } from "./ICoordonnee"
import type { IFiscal } from "./IFiscal"
import type { IIndustrie } from "./IIndustrie"
import type { ISecteur } from "./ISecteur"
import type { IStatusJuridique } from "./IStatusJuridique"
import type { ITypeEnterprise } from "./ITypeEnterprise"

export interface IEnterprise{
    user_workspace_id       : number
    name                    : string
    title_name              : string
    adresse                 : IAddressEnterprise
    secteur                 : ISecteur
    cordonnee               : ICoordonnee
    fiscal                  : IFiscal
    status_juridique        : IStatusJuridique
    is_active               : boolean
}

export interface IEnterpriseRequest{
    name                    : string
    adresse                 : IAddressEnterprise
    status_juridique        : string
    secteur                 : string
    fiscal                  : IFiscal
    cordonnee               : ICoordonnee
}
/*
https://www.economie.gouv.fr/facileco/elements-cles-lidentification-des-entreprises

- l'entreprise individuelle ( EI),
- l’entreprise individuelle sans capital social,
- l’ EIRL(entreprise individuelle à responsabilité limitée),
- l’entreSNCprise unipersonnelle à responsabilité limitée (EURL),
- la SARL (société à responsabilité limitée),
- la SA(société anonyme),
- les SAS/SASU(sociétés par actions simplifiées/ unipersonnelles),
- la SNC(société en nom collectif).

Par secteur d’activité. Le secteur 
primaire regroupe les entreprises dont l’activité 
principale tient à l’exploitation directe des ressources 
naturelles. Exemples : exploitation agricole, 
exploitation minière, etc. Le secteur secondaire 
qui regroupe les industries de transformation.
 Exemples : métallurgie, secteur automobile, etc. 
 Le secteur tertiaire concerne les services. 
 Exemples : commerce, formation, activités financières, etc.



 Par taille. les micro entreprises ou très petites 
 entreprises (TPE) entre 10 et 49 salariés, 
 les petites et moyennes entreprises (PME) 
 entre 50 et 249 salariés, les entreprises de 
 taille intermédiaire (ETI) dont l’effectif se situe 
 entre 250 et 4 999 salariés, 
 et au-delà les grandes entreprises ou les Groupes.
*/
