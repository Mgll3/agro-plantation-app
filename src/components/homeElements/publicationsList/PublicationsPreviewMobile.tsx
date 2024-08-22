import { PublicationType } from "./publicationsListTypes";

export type PublicationsPreviewMobileProps = {
	bestPublicationsArray: PublicationType[];
};

function PublicationsPreviewMobile({ bestPublicationsArray }: PublicationsPreviewMobileProps) {
	return (
		<div>
			<h1>HOLI!</h1>
		</div>
	);
}

export default PublicationsPreviewMobile;
