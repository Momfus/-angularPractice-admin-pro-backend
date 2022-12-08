
// Del lado del servidor, se devuelve según el role las opciones del menú
const getMenuFrontEnd = (role = 'USER_ROLE') => {

   const menu = [

      {
        titulo: 'Dashboard',
        icono: 'mdi mdi-gauge',
        submenu: [ // Sacadas del pages.routing.ts
          { titulo: 'Main', url: '/'},
          { titulo: 'Grafica', url: 'grafica1'},
          { titulo: 'Rxjs', url: 'rxjs'},
          { titulo: 'ProgressBar', url: 'progress'},
          { titulo: 'Promesas', url: 'promesas'},
        ]
      },
  
      {
        titulo: 'Mantenimiento',
        icono: 'mdi mdi-folder-lock-open',
        submenu: [ // Sacadas del pages.routing.ts
         //  { titulo: 'Usuarios', url: 'usuarios'},
          { titulo: 'Hospitales', url: 'hospitales'},
          { titulo: 'Médicos', url: 'medicos'},
        ]
      }
  
    ];  


    // Para admin
    if( role === 'ADMIN_ROLE' ) {
      menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })
    }
    
    return menu;

};

module.exports =  {
  getMenuFrontEnd
}