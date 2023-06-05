import { EssayCorrectionHub } from "@/components/specifics/EssayCorrection/EssayCorrectionHub";
import { EssayCorrectionProvider } from "../contexts/EssayContext/essayContext";

export default function Vitinho() {
  return (
    <>
      <EssayCorrectionProvider>
        <EssayCorrectionHub></EssayCorrectionHub>
      </EssayCorrectionProvider>
    </>
  );
}
