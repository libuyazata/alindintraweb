import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
// @Directive({
//   selector: '[allow-user]'
// })
// export class AllowUserDirective {

//   @Input('allow-user') user: string;
//     constructor(
//       private el: ElementRef,
//       private authService: AuthenticationService
//       ) {}

//     ngOnInit() {
//       debugger
//         let show = false;
//         if(this.user == 'admin' && this.authService.isAdmin())
//           show = true;
//         else if(this.user == 'hod' && this.authService.isHodCoordinator())
//           show = true;
//         else if(this.user == 'employee' && this.authService.isEmployee())
//           show = true;
        
//         if (!show)
//           this.el.nativeElement.style.display = 'none';
//     }
// }

@Directive({
  selector: '[allowUser]'
})
export class AllowUserDirective {

    constructor(
      private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef,
      private authService: AuthenticationService
      ) {}

    @Input() set allowUser(user: string){
      if(user == 'admin' && this.authService.isAdmin())
        this.viewContainer.createEmbeddedView(this.templateRef);
      else if(user == 'hod' && (this.authService.isHodCoordinator() || this.authService.isAdmin()))
        this.viewContainer.createEmbeddedView(this.templateRef);
      else if(user == 'employee' && (
        this.authService.isEmployee() ||
        this.authService.isHodCoordinator() ||
        this.authService.isAdmin()
        ))
        this.viewContainer.createEmbeddedView(this.templateRef);
      else
        this.viewContainer.clear();
    }
}
