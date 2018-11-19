import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  @Input() appHasRole: string[];
  isVisible = false;

  constructor(private viewContainerRev: ViewContainerRef, private templateRef: TemplateRef<any>,
    private authService: AuthService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    const userRoles = this.authService.decodedToken.role as Array<string>;

    // If there are no roles, clear the viewContainerRef
    if (!userRoles) {
      this.viewContainerRev.clear();
    }

    // If the user has the particular role needed, then render the element
    if (this.authService.roleMatch(this.appHasRole)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRev.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRev.clear();
      }
    }
  }

}
