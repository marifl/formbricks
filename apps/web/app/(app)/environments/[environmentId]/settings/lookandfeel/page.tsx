export const revalidate = REVALIDATION_INTERVAL;

import { getProductByEnvironmentId } from "@formbricks/lib/product/service";
import { REVALIDATION_INTERVAL } from "@formbricks/lib/constants";
import SettingsCard from "../components/SettingsCard";
import SettingsTitle from "../components/SettingsTitle";
import { EditFormbricksSignature } from "./components/EditSignature";
import { EditBrandColor } from "./components/EditBrandColor";
import { EditPlacement } from "./components/EditPlacement";
import { EditHighlightBorder } from "./components/EditHighlightBorder";
import { DEFAULT_BRAND_COLOR } from "@formbricks/lib/constants";
import { getTeamByEnvironmentId } from "@formbricks/lib/team/service";

export default async function ProfileSettingsPage({ params }: { params: { environmentId: string } }) {
  const [team, product] = await Promise.all([
    getTeamByEnvironmentId(params.environmentId),
    getProductByEnvironmentId(params.environmentId),
  ]);
  if (!team) {
    throw new Error("Team not found");
  }
  if (!product) {
    throw new Error("Product not found");
  }
  const canRemoveSignature = team.billing.features.linkSurvey.status !== "inactive";

  return (
    <div>
      <SettingsTitle title="Look & Feel" />
      <SettingsCard title="Brand Color" description="Match the surveys with your user interface.">
        <EditBrandColor product={product} />
      </SettingsCard>
      <SettingsCard
        title="In-app Survey Placement"
        description="Change where surveys will be shown in your web app.">
        <EditPlacement product={product} />
      </SettingsCard>
      <SettingsCard
        noPadding
        title="Highlight Border"
        description="Make sure your users notice the survey you display">
        <EditHighlightBorder product={product} defaultBrandColor={DEFAULT_BRAND_COLOR} />
      </SettingsCard>
      <SettingsCard
        title="Formbricks Signature"
        description="We love your support but understand if you toggle it off.">
        <EditFormbricksSignature
          product={product}
          canRemoveSignature={canRemoveSignature}
          environmentId={params.environmentId}
        />
      </SettingsCard>
    </div>
  );
}
