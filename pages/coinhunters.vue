<template>
	<v-layout
		column
		justify-center
		align-center
		style="margin-left: 3vw;"
	>
		<v-scroll-y-transition leave-absolute>
			<div class="mb-12">
				This pool has no public API data available
			</div>
		</v-scroll-y-transition>
		<GeneralInfo class="container container--fluid py-0 my-n2 pb-0" />
	</v-layout>
</template>

<script>
import UserInfo from "~/components/UserInfo";
import GeneralInfo from "~/components/GeneralInfo";
import AddressInput from "~/components/CustomVuetify/AddressInput";

import pageTransition from "~/mixins/page-transitions.js";

export default {
	mixins: [pageTransition()],
	components: {
		GeneralInfo,
	},
};
</script>
