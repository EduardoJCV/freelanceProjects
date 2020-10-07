import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'proyecto/:id',
    loadChildren: () => import('./pages/proyecto/proyecto.module').then( m => m.ProyectoPageModule)
  },
  {
    path: 'tarea/:idProy/:idTar',
    loadChildren: () => import('./pages/tarea/tarea.module').then( m => m.TareaPageModule)
  },
  {
    path: 'gastos',
    loadChildren: () => import('./pages/dinero/gastos/gastos.module').then( m => m.GastosPageModule)
  },
  {
    path: 'ingresos',
    loadChildren: () => import('./pages/dinero/ingresos/ingresos.module').then( m => m.IngresosPageModule)
  },
  { path: '**', redirectTo: '/tabs/tab2' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
