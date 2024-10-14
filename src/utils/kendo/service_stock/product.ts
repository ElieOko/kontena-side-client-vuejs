export const columnsProduct = [
    { field: 'id',title:"  N",editable: false,width: '85px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}, 
    { field:'name',title:"Nom Article",filter:'text',editable: false,width: '155px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},                 
    // { field:"description", title : "Description", editable: false,filter:'text',editor: false,width: '155px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}, 
    { field:"price_wholesale", title : "Prix Grossiste", editable: false,filter:'text',editor: false,width: '155px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:"price_retail",title:"Prix Detaillant",editable: true,width: '155px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:"devise.name", title:"Devise",editable: false,width: '115px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:"type_product.name", title:"Type",filter: "date",editable: false,width: '195px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:"packaging.name", title:"Emballage",filter: "date",editable: false,width: '195px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:"date_expiration",title:"Date d'expiration",editable: true,width: '185px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    // { field:"dateSortie", title:"Date de Sortie récents",filter: "date",editable: false}
];
//Telemetry https://www.youtube.com/watch?v=yqHxcm0soTU
