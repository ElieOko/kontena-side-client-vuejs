export const MainRoutes ={
    path: '/main',
    meta: {
        requiresAuth: false
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'dashboard',
            path: '/dashboard',
            component: () => import('@/views/dashboard/MainScreenView.vue'),
        },
        /**
         * 
         * Service Achat
         * 
         */
        // appel d'offre
        {
            name: 'sa_appel_offre_append',
            path: '/service/achat/appel_offre/append',
            component: () => import('@/views/services/achat/appel_offre/AppendAppelOffreView.vue'),
        },
        {
            name: 'sa_appel_offre_list',
            path: '/service/achat/appel_offre/list',
            component: () => import('@/views/services/achat/appel_offre/AppelOffreView.vue'),
        },
        // commande
        {
            name: 'sa_command_list',
            path: '/service/achat/command/list',
            component: () => import('@/views/services/achat/command/CommandView.vue'),
        },
        {
            name: 'sa_command_append',
            path: '/service/achat/command/append',
            component: () => import('@/views/services/achat/command/AppendCommandView.vue'),
        },
        //contrat et type contrat
        {
            name: 'sa_contrat',
            path: '/service/achat/contrat/list',
            component: () => import('@/views/services/achat/contrat/ContratView.vue'),
        },
        {
            name: 'sa_contrat_append',
            path: '/service/achat/contrat/append',
            component: () => import('@/views/services/achat/contrat/AppendContratView.vue'),
        },
        {
            name: 'sa_contrat_type_list',
            path: '/service/achat/contrat/type/list',
            component: () => import('@/views/services/achat/contrat/type/TypeContratView.vue'),
        },
        // fournisseur
        {
            name: 'sa_fournisseur_append',
            path: '/service/achat/fournisseur/append',
            component: () => import('@/views/services/achat/fournisseur/AppendFournisseurView.vue'),
        },
        {
            name: 'sa_fournisseur_list',
            path: '/service/achat/fournisseur/list',
            component: () => import('@/views/services/achat/fournisseur/FournisseurView.vue'),
        },
        // invoice
        {
            name: 'sa_invoice_append',
            path: '/service/achat/invoice/append',
            component: () => import('@/views/services/achat/invoice/AppendInvoiceView.vue'),
        },
        {
            name: 'sa_invoice_list',
            path: '/service/achat/invoice/list',
            component: () => import('@/views/services/achat/invoice/InvoiceView.vue'),
        },
        // paiement et mode
        {
            name: 'sa_paiement_append',
            path: '/service/achat/paiement/append',
            component: () => import('@/views/services/achat/paiement/AppendPaiementView.vue'),
        },
        {
            name: 'sa_paiement_list',
            path: '/service/achat/paiement/list',
            component: () => import('@/views/services/achat/paiement/PaiementView.vue'),
        },
        {
            name: 'sa_paiement_mode_list',
            path: '/service/achat/paiement/mode/list',
            component: () => import('@/views/services/achat/paiement/mode/ModePaiementView.vue'),
        },
        // Politique d'achat
        {
            name: 'sa_politique_append',
            path: '/service/achat/politique/append',
            component: () => import('@/views/services/achat/politique_achat/AppendPolitiqueAchatView.vue'),
        },
        {
            name: 'sa_politique_list',
            path: '/service/achat/politique/list',
            component: () => import('@/views/services/achat/politique_achat/PolitiqueAchatView.vue'),
        },
        // Rapport
        {
            name: 'sa_rapport_list',
            path: '/service/achat/rapport/list',
            component: () => import('@/views/services/achat/rapport/RapportView.vue'),
        },
        // Request Stock
        {
            name: 'sa_stock_request_list',
            path: '/service/achat/stock/request/list',
            component: () => import('@/views/services/achat/request_stock/RequestStockView.vue'),
        },
        /**
         * 
         * Service Finance
         * 
         */
        // account
        {
            name: 'sf_account_list',
            path: '/service/finance/account/list',
            component: () => import('@/views/services/finance/account/AccountView.vue'),
        },
        {
            name: 'sf_accout_append',
            path: '/service/finance/account/append',
            component: () => import('@/views/services/finance/account/AppendAccountView.vue'),
        },
        // budget
        {
            name: 'sf_budget_list',
            path: '/service/finance/budget/list',
            component: () => import('@/views/services/finance/budget/BudgetView.vue'),
        },
        // plan comptable
        {
            name: 'sf_plan_comptable_list',
            path: '/service/finance/chart/account/list',
            component: () => import('@/views/services/finance/chart_account/ChartAccountView.vue'),
        },
        // depense
        {
            name: 'sf_depense_list',
            path: '/service/finance/depense/list',
            component: () => import('@/views/services/finance/depense/DepenseView.vue'),
        },
        {
            name: 'sf_depense_append',
            path: '/service/finance/depense/append',
            component: () => import('@/views/services/finance/depense/AppendDepenseView.vue'),
        },
        /**
         * 
         * Service Stock Inventaire
         * 
         */
        // inventaire
        {
            name: 'ssi_inventory_list',
            path: '/service/stock/inventaire/list',
            component: () => import('@/views/services/stockInventory/inventory/InventoryView.vue'),
        },
        {
            name: 'ssi_inventory_append',
            path: '/service/stock/inventaire/append',
            component: () => import('@/views/services/stockInventory/inventory/AppendInventoryView.vue'),
        },
        // produit
        {
            name: 'ssi_product_append',
            path: '/service/stock/product/append',
            component: () => import('@/views/services/stockInventory/product/AppendProductView.vue'),
        },
        {
            name: 'ssi_product_list',
            path: '/service/stock/product/list',
            component: () => import('@/views/services/stockInventory/product/ProductView.vue'),
        },
        {
            name: 'ssi_product_defective',
            path: '/service/stock/product/defective',
            component: () => import('@/views/services/stockInventory/product/DefectiveProductView.vue'),
        },
        // stock
        {
            name: 'ssi_stock_append',
            path: '/service/stock/append',
            component: () => import('@/views/services/stockInventory/stock/AppendStockView.vue'),
        },
        {
            name: 'ssi_stock_list',
            path: '/service/stock/list',
            component: () => import('@/views/services/stockInventory/stock/StockView.vue'),
        },
        {
            name: 'ssi_stock_log_in_list',
            path: '/service/stock/log/in/list',
            component: () => import('@/views/services/stockInventory/stock/log/in/LogInStockView.vue'),
        },
        {
            name: 'ssi_stock_log_out_list',
            path: '/service/stock/log/out/list',
            component: () => import('@/views/services/stockInventory/stock/log/out/LogOutStockView.vue'),
        },
        {
            name: 'ssi_stock_rapport_list',
            path: '/service/stock/rapport/list',
            component: () => import('@/views/services/stockInventory/stock/rapport/RapportView.vue'),
        },
        {
            name: 'ssi_stock_type_list',
            path: '/service/stock/type/list',
            component: () => import('@/views/services/stockInventory/stock/type/TypeStockView.vue'),
        },
        {
            name: 'ssi_stock_valorisation_list',
            path: '/service/stock/valorisation/list',
            component: () => import('@/views/services/stockInventory/stock/valorisation/StockValorisationStockView.vue'),
        },
        {
            name: 'ssi_stock_valorisation_append',
            path: '/service/stock/valorisation/append',
            component: () => import('@/views/services/stockInventory/stock/valorisation/AppendStockValorisationStockView.vue'),
        },
        /**
         * 
         * Service Vente
         * 
         */
        // bill
        {
            name: 'sv_bill_append',
            path: '/service/vente/bill/append',
            component: () => import('@/views/services/vente/bill/AppendBillView.vue'),
        },
        {
            name: 'sv_bill_list',
            path: '/service/vente/bill/list',
            component: () => import('@/views/services/vente/bill/BillView.vue'),
        },
        // client
        {
            name: 'sv_client_append',
            path: '/service/vente/client/append',
            component: () => import('@/views/services/vente/client/AppendClientView.vue'),
        },
        {
            name: 'sv_client_list',
            path: '/service/vente/client/list',
            component: () => import('@/views/services/vente/client/ClientView.vue'),
        },
        /**
         * 
         * Service GRH
         * 
         */
        // Adminstration[archivage,contrat,partenaire,subvention,vacance]
        {
            name: 'sr_archivage_append',
            path: '/service/grh/administration/archivage/append',
            component: () => import('@/views/services/grh/administration/archivage/ArchvageDossierAppendView.vue'),
        },
        {
            name: 'sr_archivage_list',
            path: '/service/grh/administration/archivage/list',
            component: () => import('@/views/services/grh/administration/archivage/ArchivageDossierView.vue'),
        },
        {
            name: 'sr_archivage_dossier_list',
            path: '/service/grh/administration/archivage/dossier/list',
            component: () => import('@/views/services/grh/administration/archivage/DetailDossierView.vue'),
        },
        {
            name: 'sr_archivage_dossier_append',
            path: '/service/grh/administration/archivage/dossier/append',
            component: () => import('@/views/services/grh/administration/archivage/DossierAppendView.vue'),
        },

        {
            name: 'sr_contrat_append',
            path: '/service/grh/administration/contrat/append',
            component: () => import('@/views/services/grh/administration/contrat/ContratAppendView.vue'),
        },
        {
            name: 'sr_contrat_list',
            path: '/service/grh/administration/contrat/list',
            component: () => import('@/views/services/grh/administration/contrat/ContratView.vue'),
        },

        {
            name: 'sr_contrat_enterprise_append',
            path: '/service/grh/administration/contrat/enterprise/append',
            component: () => import('@/views/services/grh/administration/contrat/ContratEnterprise.vue'),
        },
        {
            name: 'sr_contrat_personnel_list',
            path: '/service/grh/administration/contrat/personnel/list',
            component: () => import('@/views/services/grh/administration/contrat/ContratPersonnel.vue'),
        },
        {
            name: 'sr_contrat_type_list',
            path: '/service/grh/administration/contrat/type/list',
            component: () => import('@/views/services/grh/administration/contrat/TypeContrat/TypeContratView.vue'),
        },
        {
            name: 'sr_contrat_type_append',
            path: '/service/grh/administration/contrat/type/append',
            component: () => import('@/views/services/grh/administration/contrat/TypeContrat/TypeContratAppendView.vue'),
        },

        {
            name: 'sr_partenaire_list',
            path: '/service/grh/administration/partenaire/list',
            component: () => import('@/views/services/grh/administration/partenaire/PartenaireView.vue'),
        },

        {
            name: 'sr_subvention_list',
            path: '/service/grh/administration/subvention/list',
            component: () => import('@/views/services/grh/administration/subvention/SubventionView.vue'),
        },
        {
            name: 'sr_subvention_append',
            path: '/service/grh/administration/subvention/append',
            component: () => import('@/views/services/grh/administration/subvention/SubventionAppendView.vue'),
        },
        {
            name: 'sr_vacance_append',
            path: '/service/grh/administration/vacance/append',
            component: () => import('@/views/services/grh/administration/vacance/VacanceAppendView.vue'),
        },
        {
            name: 'sr_vacance_list',
            path: '/service/grh/administration/vacance/list',
            component: () => import('@/views/services/grh/administration/vacance/VacanceAppendView.vue'),
        },
        // carrière
        {
            name: 'sr_promotion_list',
            path: '/service/grh/carriere/promotion/list',
            component: () => import('@/views/services/grh/carriere/PromotionPersonnelView.vue'),
        },
        {
            name: 'sr_seniority_list',
            path: '/service/grh/carriere/seniority/list',
            component: () => import('@/views/services/grh/carriere/SeniorityView.vue'),
        },
        // formation
        {
            name: 'sr_formation_list',
            path: '/service/grh/formation/list',
            component: () => import('@/views/services/grh/formation/FormationView.vue'),
        },
        {
            name: 'sr_formation_append',
            path: '/service/grh/formation/append',
            component: () => import('@/views/services/grh/formation/AppendFormationView.vue'),
        },
        {
            name: 'sr_formation_type_append',
            path: '/service/grh/formation/type/append',
            component: () => import('@/views/services/grh/formation/type_formation/AppendTypeFormationView.vue'),
        },
        {
            name: 'sr_formation_type_list',
            path: '/service/grh/formation/type/list',
            component: () => import('@/views/services/grh/formation/type_formation/TypeFormationView.vue'),
        },
        // other [departement, grade, poste, profession, secteur]
        {
            name: 'sr_other_departement_list',
            path: '/service/grh/other/departement/list',
            component: () => import('@/views/services/grh/other/departement/DepartementView.vue'),
        },
        {
            name: 'sr_other_departement_append',
            path: '/service/grh/other/departement/append',
            component: () => import('@/views/services/grh/other/departement/AppendDepartementView.vue'),
        },
        {
            name: 'sr_other_grade_append',
            path: '/service/grh/other/grade/append',
            component: () => import('@/views/services/grh/other/grade/AppendGradeView.vue'),
        },
        {
            name: 'sr_other_grade_list',
            path: '/service/grh/other/grade/list',
            component: () => import('@/views/services/grh/other/grade/GradeView.vue'),
        },
        {
            name: 'sr_other_poste_list',
            path: '/service/grh/other/poste/list',
            component: () => import('@/views/services/grh/other/poste/PosteView.vue'),
        },
        {
            name: 'sr_other_poste_append',
            path: '/service/grh/other/poste/append',
            component: () => import('@/views/services/grh/other/poste/AppendPosteView.vue'),
        },
        {
            name: 'sr_other_profession_list',
            path: '/service/grh/other/profession/list',
            component: () => import('@/views/services/grh/other/profession/ProfessionView.vue'),
        },
        {
            name: 'sr_other_profession_append',
            path: '/service/grh/other/profession/append',
            component: () => import('@/views/services/grh/other/profession/AppendProfessionView.vue'),
        },
        {
            name: 'sr_other_secteur_append',
            path: '/service/grh/other/secteur/append',
            component: () => import('@/views/services/grh/other/secteur/AppendSecteurView.vue'),
        },
        {
            name: 'sr_other_secteur_list',
            path: '/service/grh/other/secteur/list',
            component: () => import('@/views/services/grh/other/secteur/SecteurView.vue'),
        },
        // performance
        {
            name: 'sr_perfomance_critere_list',
            path: '/service/grh/performance/critere/list',
            component: () => import('@/views/services/grh/performance/critere/CritereView.vue'),
        },
        {
            name: 'sr_perfomance_critere_append',
            path: '/service/grh/performance/critere/append',
            component: () => import('@/views/services/grh/performance/critere/AppendCritereView.vue'),
        },
        {
            name: 'sr_perfomance_evaluation_append',
            path: '/service/grh/performance/evaluation/append',
            component: () => import('@/views/services/grh/performance/evaluation/AppendEvaluationView.vue'),
        },
        {
            name: 'sr_perfomance_evaluation_list',
            path: '/service/grh/performance/evaluation/list',
            component: () => import('@/views/services/grh/performance/evaluation/EvaluationView.vue'),
        },
        // personnel
        {
            name: 'sr_personnel_list',
            path: '/service/grh/personnel/list',
            component: () => import('@/views/services/grh/personnel/PersonnelView.vue'),
        },
        {
            name: 'sr_personnel_append',
            path: '/service/grh/personnel/append',
            component: () => import('@/views/services/grh/personnel/AppendPersonnelView.vue'),
        },
        // recrutement integration
        {
            name: 'sr_recrutement_candidat_append',
            path: '/service/grh/recrutement/candidat/append',
            component: () => import('@/views/services/grh/recrutement_integration/candidat/AppendCandidatView.vue'),
        },
        {
            name: 'sr_recrutement_candidat_list',
            path: '/service/grh/recrutement/candidat/list',
            component: () => import('@/views/services/grh/recrutement_integration/candidat/CandidatView.vue'),
        },
        {
            name: 'sr_integration_list',
            path: '/service/grh/recrutement/integration/list',
            component: () => import('@/views/services/grh/recrutement_integration/integration/IntegrationView.vue'),
        },
        // salaire
        {
            name: 'sr_salaire_list',
            path: '/service/grh/salaire/list',
            component: () => import('@/views/services/grh/salaire/SalaireView.vue'),
        },
        {
            name: 'sr_salaire_append',
            path: '/service/grh/recrutement/salaire/append',
            component: () => import('@/views/services/grh/salaire/AppendSalaireView.vue'),
        },
        {
            name: 'sr_salaire_employee_append',
            path: '/service/grh/recrutement/salaire/employee/append',
            component: () => import('@/views/services/grh/salaire/AppendSalaireEmployeeView.vue'),
        },
        {
            name: 'sr_salaire_employee_list',
            path: '/service/grh/recrutement/salaire/employee/list',
            component: () => import('@/views/services/grh/salaire/SalaireEmployeeView.vue'),
        },
        {
            name: 'sr_salaire_list',
            path: '/service/grh/recrutement/salaire/employee/list',
            component: () => import('@/views/services/grh/salaire/SalaireView.vue'),
        },
        // temps_travail
        {
            name: 'sr_temps_travail_presence_list',
            path: '/service/grh/temps/travail/presence/list',
            component: () => import('@/views/services/grh/temps_travail/PresenceView.vue'),
        },
        {
            name: 'sr_temps_travail_presence_append',
            path: '/service/grh/temps/travail/presence/append',
            component: () => import('@/views/services/grh/temps_travail/PresencePointageView.vue'),
        },

    ]
}