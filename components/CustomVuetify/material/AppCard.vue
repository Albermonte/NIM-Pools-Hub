<template>
	<v-card
		v-bind="$attrs"
		:style="styles"
		:min-width="minWidth"
		max-width="640"
		v-on="$listeners"
	>
		<helper-offset
			v-if="hasOffset"
			:inline="inline"
			:full-width="fullWidth"
			:offset="offset"
		>
			<v-card
				v-if="!$slots.offset"
				:color="color"
				:class="`elevation-${elevation}`"
				class="v-card--material__header"
				dark
			>
				<slot
					v-if="!title && !text"
					name="header"
				/>
				<span v-else>
					<h4
						class="title font-weight-light mb-2 text-center"
						v-text="title"
					/>
					<p
						class="category font-weight-thin"
						v-text="text"
					/>
				</span>
			</v-card>
			<slot
				v-else
				name="offset"
			/>
		</helper-offset>

		<v-card-text
			class="d-flex flex-column justify-center"
			:style="{
        'max-height': $vuetify.breakpoint.xs ? '250px' : '215px',
        height: statsCardHeight
        }"
		>
			<slot />
		</v-card-text>

		<v-card-actions v-if="$slots.actions">
			<slot name="actions" />
		</v-card-actions>
	</v-card>
</template>

<script>
import helperOffset from "~/components/CustomVuetify/helper/AppOffset";

export default {
	components: {
		helperOffset,
	},
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
		minWidth: {
			default: 300,
		},
	},
	computed: {
		hasOffset() {
			return (
				this.$slots.header || this.$slots.offset || this.title || this.text
			);
		},
		styles() {
			if (!this.hasOffset) {
				return null;
			}

			return {
				marginBottom: `${this.offset}px`,
				marginTop: `${this.offset * 2}px`,
			};
		},
		statsCardHeight() {
			if (this.title?.includes("Stats")) return "215px";
		},
	},
};
</script>

<style lang="scss">
.v-card--material {
	&__header {
		&.v-card {
			border-radius: 4px;
		}
	}
}
</style>
