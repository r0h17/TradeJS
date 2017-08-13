// Lib
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {HeaderPlaygroundComponent}  from './components/header-playground/header-playground.component';
import {HeaderEditorComponent}  from './components/header-editor/header-editor.component';
import {FooterComponent}  from './components/footer/footer.component';
import {FileTreeComponent}  from './components/file-tree/file-tree.component';
import {JSEditorComponent}  from './components/jseditor/jseditor.component';
import {SocketService} from './services/socket.service';
import {CookieModule} from 'ngx-cookie';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {routing} from './app.routing';

import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {InstrumentListComponent, SearchFilter} from './components/intrument-list/instrument-list.component';
import {ChartOverviewComponent} from './components/chart-overview/chart-overview.component';
import {AuthGuard} from './guards/auth.guard';
import {UserService} from './services/user.service';
import {LoginComponent} from './components/login/login.component';
import {StatusComponent} from './components/status/status.component';
import {SystemService} from './services/system.service';
import {ConstantsService} from './services/constants.service';
import {DialogComponent} from './components/dialog/dialog.component';
import {ModalComponent} from './components/modal/modal.component';
import {DialogAnchorDirective} from './directives/dialoganchor.directive';
import {ModalAnchorDirective} from './directives/modalanchor.directive';
import {ModalService} from './services/modal.service';
import {InstrumentsService} from './services/instruments.service';
import {ResizableDirective} from './directives/resizable.directive';
import {ChartBoxComponent} from './components/chart-box/chart-box.component';
import {BacktestSettingsComponent} from './components/backtest-settings/backtest-settings.component';
import {BacktestReportComponent} from './components/backtest-report/backtest-report.component';
import {CacheService} from './services/cache.service';
import {BacktestComponent, GroupIdsPipe} from './components/backtest/backtest.component';
import {CoreListComponent} from './components/core-list/core-list.component';
import {PageMainComponent} from './components/page-main/page.main.component';
import {PagePlaygroundComponent} from './components/page-playground/page.playground.component';
import {PageEditorComponent} from './components/page-editor/page.editor.component';
import {HeaderSocialComponent} from './components/header-social/header-social.component';
import {SocialService} from './services/social.service';
import {AuthenticationService} from './services/authenticate.service';
import {customHttpProvider} from './services/http.service';
import {AlertService} from './services/alert.service';
import {AlertComponent} from './components/alert/alert.component';
import {RegisterComponent} from './components/register/register.component';
import {HttpModule} from '@angular/http';
import {UserOverviewComponent} from './components/user-overview/user.overview.component';
import {OrderService} from './services/order.service';
import {ChannelOverviewComponent} from './components/channel-overview/channel-overview.component';
import {TradingChannelService} from './services/trading.channel.service';
import {GroupByPipe, PortfolioComponent} from './components/portfolio/portfolio.component';
import {ProfileComponent} from './components/profile/profile.component';
import {PageSubUserComponent} from './components/page-sub-user/page.sub.user.component';

@NgModule({
	declarations: [
		AppComponent,
		BacktestComponent,
		BacktestReportComponent,
		BacktestSettingsComponent,
		ChartBoxComponent,
		ChartOverviewComponent,
		DialogAnchorDirective,
		DialogComponent,
		PageEditorComponent,
		FileTreeComponent,
		FooterComponent,
		GroupIdsPipe,
		HeaderPlaygroundComponent,
		HeaderEditorComponent,
		HeaderSocialComponent,
		PagePlaygroundComponent,
		InstrumentListComponent,
		JSEditorComponent,
		LoginComponent,
		RegisterComponent,
		ModalComponent,
		ModalAnchorDirective,
		ResizableDirective,
		SearchFilter,
		StatusComponent,
		CoreListComponent,
		PageMainComponent,
		ChannelOverviewComponent,
		AlertComponent,
		UserOverviewComponent,
		PortfolioComponent,
		GroupByPipe,
		ProfileComponent,
		PageSubUserComponent
	],
	imports: [
		BrowserModule,
		CookieModule.forRoot(),
		routing,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		MultiselectDropdownModule
	],
	providers: [
		customHttpProvider,
		AuthGuard,
		AlertService,
		AuthenticationService,
		UserService,
		TradingChannelService,

		{provide: OrderService, useClass: OrderService},
		{provide: SystemService, useClass: SystemService},
		{provide: ConstantsService, useClass: ConstantsService},
		{provide: SocketService, useClass: SocketService},
		{provide: ModalService, useClass: ModalService},
		{provide: InstrumentsService, useClass: InstrumentsService},
		{provide: CacheService, useClass: CacheService},
		{provide: SocialService, useClass: SocialService}
	],
	bootstrap: [
		AppComponent
	],

	entryComponents: [DialogComponent]
})

export class AppModule {
}