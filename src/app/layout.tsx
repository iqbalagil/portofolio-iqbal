import  "@/app/globals.module.scss";
import {ReactNode} from "react";

export default function Porto({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
