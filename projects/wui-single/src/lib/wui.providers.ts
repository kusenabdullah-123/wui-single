import { DatePipe, DecimalPipe } from "@angular/common";
import { Provider } from "@angular/core";
import { WuiModalOverlayContainer, WuiModalOverlay, WuiModal } from "./components/modal/modal-overlay";
import { WuiPageOverlayContainer, WuiPageOverlay, WuiPage } from "./components/page/page-overlay.service";
import { MessageService } from "./services/message.service";
import { WuiService } from "./services/wui.service";


export function provideWui(): Provider[] {
    return [
      DatePipe,
      DecimalPipe,
      WuiModalOverlayContainer,
      WuiModalOverlay,
      WuiModal,
      WuiPageOverlayContainer,
      WuiPageOverlay,
      WuiPage,
      WuiService,
      MessageService
    ] as Provider[];
  }
  
