<template>
	<v-card
		:height="height"
		:width="width"
		outlined
		style="border-radius: 8px"
	>
		<v-list class="pt-3 pb-1">
			<v-list-item>
				<v-list-item-avatar size="50">
					<v-img :src="pool.icon"></v-img>
				</v-list-item-avatar>
				<v-col
					class="pa-0"
					cols="6"
				>
					<div class="headline">{{ pool.displayName }}</div>
				</v-col>
				<v-col
					class="pa-0 d-flex justify-center align-center"
					cols="3"
				>
					<div class="mx-auto">
						<v-chip
							v-if="pool.status === 'online'"
							text-color="green accent-5"
							color="green lighten-5"
							class="font-weight-light"
							x-small
						>Online</v-chip>
						<v-chip
							v-else-if="pool.status === 'offline'"
							text-color="red accent-4"
							color="red lighten-5"
							class="font-weight-light"
							x-small
						>Offline</v-chip>
						<v-chip
							v-else
							text-color="blue-grey accent-4"
							color="blue-grey lighten-5"
							x-small
							class="font-weight-light"
						>Checking</v-chip>
					</div>
				</v-col>
			</v-list-item>
			<v-list-item>
				<v-list-item-content class="pt-1 pb-0">
					<v-list-item-subtitle class="text-center">{{
						pool.slogan
					}}</v-list-item-subtitle>
					<v-list-item-title>
						<v-row
							class="pb-0"
							justify="center"
						>
							<v-col
								v-if="poolFee"
								class="py-0 pb-1 d-flex flex-column align-center justify-center"
								style="max-width: 125px; min-width: 125px"
							>
								<div class="headline d-flex">
									<span
										class="font-weight-medium"
										style="font-size: 32px; height: 100%"
									>{{ poolFee.whole }}</span>
									<span
										v-if="poolFee.decimal"
										class="title font-weight-regular mr-1 d-flex align-end"
										style="
											height: 100%;
											margin-left: -2px;
											font-size: 20px !important;
										"
									>.{{ poolFee.decimal }}</span>
									<span
										class="d-flex align-end"
										style="height: 100%"
									>%</span>
								</div>
								<div
									class="mt-n2 text-uppercase overline font-weight-bold grey--text text--darken-1"
									style="font-size: 10px !important; max-height: 16px"
								>Pool fee</div>
							</v-col>
							<v-col
								class="pa-0 d-flex flex-column justify-center align-center"
								style="height: 70px; max-width: max-content; min-width: 180px"
							>
								<div class="m-grid">
									<template v-if="minimumPayout">
										<div>Minimum Payout:</div>
										<div class="font-weight-regular text-right">{{ minimumPayout }} NIM</div>
									</template>
									<template v-if="payoutFrecuency">
										<div>Payout Interval:</div>
										<div class="font-weight-regular text-right">{{ payoutFrecuency }}</div>
									</template>
								</div>
							</v-col>
						</v-row>
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<v-card-actions class="d-flex justify-center">
			<v-btn
				class="px-8"
				style="margin-bottom: -34px"
				absolute
				bottom
				rounded
				color="primary"
				nuxt
				:to="pool.name"
			>Go!</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: {
		pool: {
			type: Object,
		},
		height: {
			type: Number,
			default: 190,
		},
		width: {
			type: Number,
			default: 360,
		},
	},
	computed: {
		poolFee() {
			const fee = this.pool.extras[0];
			const percentage = fee.substr(fee.indexOf(": ") + 2);
			const num = percentage.substr(0, percentage.indexOf("%")).split(".");
			if(num.every((n) => n === '')) return null;
			return {
				whole: num[0],
				decimal: num[1],
			};
		},
		minimumPayout() {
			return eval("this.$store.state." + this.pool.name + ".minimum_payout");
		},
		payoutFrecuency() {
			const frequency = eval(
				"this.$store.state." + this.pool.name + ".payout_frecuency"
			);
			return frequency ? `${frequency} ${frequency !== 1 ? "hours" : "hour"}` : null;
		},
	},
};
</script>

<style scoped>
.v-chip.v-size--x-small {
	border-radius: 15px;
	font-size: 14px;
	height: 28px;
}

.v-list-item__title,
.v-list-item__subtitle {
	white-space: pre-line;
}
.v-application .overline {
	letter-spacing: 0.03em !important;
}

.m-grid {
	display: grid;
	grid-template-columns: repeat(2, auto);
	grid-template-rows: repeat(2, auto);
	grid-row-gap: 5px;
	width: 186px;
}
</style>