import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable()
export class AlertNotificationService {

    private confirmSuccessBtnColor: string = '#d33';
    private confirmcancelBtnColor: string = '#3085d6'

    constructor() {
        
    }

    /**
     * Show success message 
     * 
     * @param message 
     * @param title 
     */
    public showSuccess(message: string, title: string) {
        Swal.fire(title,message,'success');
    }

    /**
     * Show error message 
     * 
     * @param message 
     * @param title 
     */
    public showError(message: string, title: string) {
        Swal.fire(title,message,'error');
    }

    /**
     * Show warning message 
     * 
     * @param message 
     * @param title 
     */
    public showWarning(message: string, title: string) {
        Swal.fire(title,message,'warning');
    }

    /**
     * Show info message 
     * 
     * @param message 
     * @param title 
     */
    public showInfo(message: string, title: string) {
        Swal.fire(title,message,'info');
    }


    public showDeleteStatus(item : string, isDeleted : boolean) {
        let message = "Error while deleting the " + item;
        let title = "Delete Error!"

        if(isDeleted) {
            message = "The " + item  +" has been deleted";
            title = "Deleted!"
            this.showSuccess(message, title);
        } else {
            this.showError(message, title);
        }
    }

    public showSuspendStatus(item : string, isDeleted : boolean) {
        let message = "Error while suspending the " + item;
        let title = "Suspend Error!"

        if(isDeleted) {
            message = "The " + item  +" has been suspended";
            title = "Suspended!"
            this.showSuccess(message, title);
        } else {
            this.showError(message, title);
        }
    }

    public showSaveStatus(item: string, isSaved : boolean) {
        let message = "Error while saving the " + item;
        let title = "Save Error!";

        if(isSaved) {
            message = "The " + item  +" has been saved";
            title = "Saved!"
            this.showSuccess(message, title);
        } else {
            this.showError(message, title);
        }
    }
	public showSendStatus(item: string, isSend : boolean) {
        let message = "Error while sending the " + item;
        let title = "Send Error!";

        if(isSend) {
            message = "The " + item  +" has been sent";
            title = "Sent!"
            this.showSuccess(message, title);
        } else {
            this.showError(message, title);
        }
    }

    public showConfirmation(_self: any, message: string, title: string, successBtnText: string, successCallbackFn: any, callbackParams : any) {
        Swal.fire({
            title: title,
            text: message,
            showCancelButton: true,
            confirmButtonColor: this.confirmSuccessBtnColor,
            cancelButtonColor: this.confirmcancelBtnColor,
            confirmButtonText: successBtnText,
            customClass: {
                icon: 'swal2-warning'
            }
        }).then((result: any) => {
            if (result.value) {
              successCallbackFn(_self, callbackParams);
            }
        })
    }

    public showPermenantDeleteConfirmation(_self: any, item: string, successCallbackFn : any, callbackParams : any) {
        let title = "Are you sure?";
        let message = "You won't be able to revert this!";
        let successBtnText = "Yes, delete it!";

        this.showConfirmation(_self, message, title, successBtnText, successCallbackFn, callbackParams);
    }


}