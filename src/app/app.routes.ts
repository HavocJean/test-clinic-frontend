import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { HistoryComponent } from './pages/history/history.component';
import { HistoryFormComponent } from './pages/history-forms/history-form.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
    { path: 'history/create', component: HistoryFormComponent, canActivate: [AuthGuard] },
    { path: 'history/edit/:id', component: HistoryFormComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }