import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { TablaBusquedaComponent } from './tabla-busqueda/tabla-busqueda.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [IncrementadorComponent, DonaComponent, ModalImagenComponent, TablaBusquedaComponent],
  imports: [CommonModule, FormsModule, ChartsModule, PipesModule],
  exports: [IncrementadorComponent, DonaComponent, ModalImagenComponent, TablaBusquedaComponent],
})
export class ComponentsModule {}
