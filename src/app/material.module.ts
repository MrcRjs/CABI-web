import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatToolbarModule, MatTooltipModule, MatPaginatorModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule( {
    // tslint:disable-next-line:max-line-length
    exports: [ MatBadgeModule, MatTableModule, MatAutocompleteModule, MatProgressSpinnerModule, MatSlideToggleModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule, MatListModule, MatDividerModule, MatExpansionModule, MatTabsModule, MatSelectModule, MatNativeDateModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatRadioModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule ],
    // tslint:disable-next-line:max-line-length
    imports: [ MatBadgeModule, MatTableModule, MatAutocompleteModule, MatProgressSpinnerModule, MatSlideToggleModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule, MatListModule, MatDividerModule, MatExpansionModule, MatTabsModule, MatSelectModule, MatNativeDateModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatRadioModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule ],
} )
export class MaterialModule {
}
