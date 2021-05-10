<template>
	<div
		class="pt-3 pb-4 d-flex align-center"
		style="min-height: 284;"
	>
		<v-card
			v-bind="$attrs"
			:width="$vuetify.breakpoint.smAndDown ? '320' : '728'"
			:height="$vuetify.breakpoint.smAndDown ? '100' : '90'"
			v-on="$listeners"
			class="mx-auto"
			:class="$vuetify.breakpoint.smAndDow ? 'no-ad-sm' : 'no-ad'"
		>
			<!-- <adsbygoogle
        v-if="!dev"
        data-ad-slot="8810901032"
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />-->
			<!-- <ins
        v-if="$vuetify.breakpoint.smAndDown"
        class="bmadblock-5ecbb30693ee28580bb674bb"
        style="display:inline-block;width:320px;height:100px;"
      ></ins>-->
			<!-- <ins
        v-else
        class="bmadblock-5ecbb43593ee287b36b675b0"
        style="display:inline-block;width:728px;height:90px;"
      ></ins>-->
			<iframe
				src="https://viewm.moonicorn.network/#%7B%22options%22%3A%7B%22publisherAddr%22%3A%220x39f9c2962004ad4e9Bc50ac3CCE29B5FBDfFd871%22%2C%22whitelistedTokens%22%3A%5B%220x6B175474E89094C44Da98b954EedeAC495271d0F%22%5D%2C%22whitelistedType%22%3A%22legacy_728x90%22%2C%22randomize%22%3Atrue%2C%22targeting%22%3A%5B%5D%2C%22width%22%3A%22728%22%2C%22height%22%3A%2290%22%2C%22minPerImpression%22%3A%220%22%2C%22fallbackUnit%22%3Anull%2C%22marketSlot%22%3A%22QmZFuBe7g957cJZdBdspLJvo4RFZzdHVjXm3TjfNUPWm84%22%7D%7D"
				width="728"
				height="90"
				scrolling="no"
				frameborder="0"
				style="border: 0;"
				@load="adOnLoad"
			></iframe>
			<!-- <div class="coinzilla" data-zone="C-8375eca4229a60ea729"></div> -->
		</v-card>
	</div>
</template>

<script>
import config from "~/nuxt.config";

export default {
	inheritAttrs: false,
	props: {
		color: {
			type: String,
			default: "secondary",
		},
		elevation: {
			type: [Number, String],
			default: 10,
		},
		inline: {
			type: Boolean,
			default: false,
		},
		fullWidth: {
			type: Boolean,
			default: false,
		},
		offset: {
			type: [Number, String],
			default: 24,
		},
		title: {
			type: String,
			default: undefined,
		},
		text: {
			type: String,
			default: undefined,
		},
		placedTop: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			dev: config.dev,
		};
	},
	methods: {
		adOnLoad() {
			window.addEventListener(
				"message",
				function (ev) {
					if (
						ev.data.hasOwnProperty("adexHeight") &&
						"https://viewm.moonicorn.network" === ev.origin
					) {
						for (let f of document.getElementsByTagName("iframe")) {
							if (f.contentWindow === ev.source) {
								f.height = ev.data.adexHeight;
							}
						}
					}
				},
				false
			);
		},
	},
	computed: {
		styles() {
			return {
				marginBottom: `${this.offset}px`,
				marginTop: `${this.offset * 2}px`,
			};
		},
	},
	mounted() {
		window.coinzilla_display = window.coinzilla_display || [];
		var c_display_preferences = {};
		c_display_preferences.zone = "8375eca4229a60ea729";
		c_display_preferences.width = this.$vuetify.breakpoint.smAndDown
			? "320"
			: "728";
		c_display_preferences.height = this.$vuetify.breakpoint.smAndDown
			? "100"
			: "90";
		coinzilla_display.push(c_display_preferences);
	},
};
</script>

<style lang="scss" scoped>
.v-card--material {
	&__header {
		&.v-card {
			border-radius: 4px;
		}
	}
}

.no-ad {
	background: url("https://picsum.photos/728/100");
}
.no-ad-sm {
	background: url("https://picsum.photos/320/110/");
}
</style>

