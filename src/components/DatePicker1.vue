<template>
	<div id="date-picker">


		<div class="date">


			<div class="years">
				<div class="next" @click="incYear"></div>
				<div class="prev" @click="decYear"></div>
				<div class="year" :class="{animate : !showYear}">{{ year }} سال</div>
				<div class="year" :class="{animate : showYear}">{{ year }} سال</div>
			</div>

			<div class="months">
				<div class="month" :class="{animate: showMonth}">{{ months[month].title }}
					<div class="next" @click="incMonth"></div>
					<div class="prev" @click="decMonth"></div>
				</div>
			</div>

			<div class="result">
				{{ now }}
				<span class="space"></span>
				{{ wd }}
				<span class="space"></span>
				امروز
			</div>
			<div class="result" :class="{dd : showResult}">{{ result }}</div>


			<div class="days">
				<div class="day" v-for="n in days" :key="n" :class="{select : (n === day)}" @click="changeDay(n)">
					{{ n }}
				</div>

			</div>

			<div class="buttons">
				<div class="button" @click="funcNow">امروز</div>
				<div class="button" @click="verify">تایید</div>
				<div class="button" @click="cancel">انصراف</div>
			</div>

		</div>

	</div>
</template>

<script>
    import moment from 'moment-jalaali'

    export default {
        name: "DatePicker",

        components: {},

        data() {
            return {
                year: 0,
                month: 0,
                day: 0,
                wd: '',
                result: {},
                now: '',
                showYear: false,
                showMonth: false,
                showResult: false,
                x: 1348,

                months: [
                    {title: 'فروردین', number: 1},
                    {title: 'اردیبهشت', number: 2},
                    {title: 'خرداد', number: 3},
                    {title: 'تیر', number: 4},
                    {title: 'مرداد', number: 5},
                    {title: 'شهریور', number: 6},
                    {title: 'مهر', number: 7},
                    {title: 'آبان', number: 8},
                    {title: 'آذر', number: 9},
                    {title: 'دی', number: 10},
                    {title: 'بهمن', number: 11},
                    {title: 'اسفند', number: 12},
                ],
            }
        },

        props: {
            value: String,
        },

        computed: {
            days: function () {
                const vm = this;
                if (vm.leapYear(vm.year) && (vm.month > 5)) {
                    return 30
                } else if (vm.month > 5) {
                    return 29;
                } else {
                    return 31;
                }
            }
        },


        methods: {

            createResult() {
                const vm = this;
                let y = vm.year;
                let m = '';
                let d = '';
                if (vm.month < 9) {
                    m = '0' + (vm.month + 1);
                } else {
                    m = (vm.month + 1);
                }
                if (vm.day < 10) {
                    d = '0' + vm.day;
                } else {
                    d = vm.day;
                }
                vm.result = y + '/' + m + '/' + d;

            },

            incYear() {
                const vm = this;
                vm.showYear = !vm.showYear;
                vm.year++;
                vm.createResult();
                vm.showResult = !vm.showResult;
                vm.$emit('input', vm.result);
            },
            decYear() {
                const vm = this;
                vm.showYear = !vm.showYear;
                vm.year--;
                vm.createResult();
                vm.showResult = !vm.showResult;
                vm.$emit('input', vm.result)
            },


            incMonth() {
                const vm = this;
                vm.showMonth = !vm.showMonth;
                vm.month++;
                if (vm.month > 11) {
                    vm.month = 0;
                    vm.year = vm.year + 1;
                    vm.showYear = !vm.showYear;
                }
                vm.createResult();
                vm.showResult = !vm.showResult;
                vm.$emit('input', vm.result);
            },


            decMonth() {
                const vm = this;
                vm.showMonth = !vm.showMonth;
                vm.month--;
                if (vm.month < 0) {
                    vm.month = 11;
                    vm.year = vm.year - 1;
                    vm.showYear = !vm.showYear;
                }
                vm.createResult();
                vm.showResult = !vm.showResult;
                vm.$emit('input', vm.result);
            },

            changeDay(day) {
                const vm = this;
                vm.day = day;
                vm.createResult();
                vm.showResult = !vm.showResult;
                vm.$emit('input', vm.result);
            },


            leapYear(year) {
                let ary = [1, 5, 9, 13, 17, 22, 26, 30];
                let b = year % 33;
                if (ary.indexOf(b) != -1) {
                    return true;
                } else {
                    return false;

                }
            },

            funcNow() {
                const vm = this;
                vm.showYear = !vm.showYear;
                vm.showMonth = !vm.showMonth;
                let n = vm.now;
                let a = [];
                a = n.split('/');
                vm.year = a[0] - 0;
                vm.month = a[1] - 0;
                vm.month--;
                vm.day = a[2] - 0;
                vm.result = vm.now;
                vm.showResult = !vm.showResult;
                vm.$emit('input', vm.result);

            },

            weekDay() {
                let week = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهار شنبه', 'پنج شنبه ', 'جمعه', 'شنبه'];
                let date = new Date();
                let wd = date.getDay();
                return week[wd];
            },

            // getWeekDay(month, day, year) {
            //     let timestamp = jmktime(0, 0, 0, month, day, year);
            //     let dayInfo = jgetdate(timestamp);
            //     return dayInfo;
            // },


            verify() {
                const vm = this;
                vm.$emit('input', vm.result);
            },

            cancel() {
                return this.$emit('close', true)
            }

        },


        mounted() {
            let date = new Date();
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let d = date.getDate();
            if (d < 10) {
                d = '0' + d;
            }
            if (m < 10) {
                m = '0' + m;
            }

            // let str = vm.getWeekDay(m, d, y);

            let stDate = y + "-" + m + "-" + d;
            let change = moment(stDate).format('jYYYY/jMM/jDD');

            let arr = [];
            arr = change.split('/');
            const vm = this;
            vm.year = arr[0] - 0;
            vm.month = arr[1] - 0;
            vm.month--;
            vm.day = arr[2] - 0;
            vm.createResult();
            vm.now = vm.result;
            vm.wd = vm.weekDay();

        }


    }
</script>

<style scoped lang="scss">

	#date-picker {

		user-select: none;
		background-color: aqua;
		padding: 10px;
		border-radius: 10px;

		html, body {
			/*color: #2c3e50;*/
		}

		.date {
			color: blue;
			/*padding: 20px;*/
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;

			.result {
				background-color: #ffffff;
				color: #000000;
				width: 100%;
				height: 40px;
				perspective: 800px;
				transition: all 1s;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.dd {
				transform: rotateY(360deg);
			}

			.years {
				border: 1px solid blue;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 10px;
				width: 100%;
				height: 40px;
				position: relative;
				background-color: #ffffff;
				color: #000000;
				white-space: nowrap;
				perspective: 800px;



				.year {
					/*width: 100%;*/
					/*height: 100%;*/
					/*background-color: #ffffff;*/
					/*color: #000000;*/
					/*border: 1px solid blue;*/
					/*position: absolute;*/
					/*transition: all .5s;*/
					/*top: 0;*/
					/*left: 0;*/
					/*display: flex;*/
					/*justify-content: center;*/
					/*align-items: center;*/
					/*transform-origin: 10% 10%;*/

					position: absolute;
					left: 40%;
					top: 8px;
					transition: all 1s;
					transform: skewX(0deg);
					display: none;


				}

				.next {
					border: 3px solid blue;
					width: 20px;
					height: 20px;
					transform: rotate(45deg);
					border-left: none;
					border-bottom: none;
					position: absolute;
					right: 10px;
					top: 5px;
					cursor: pointer;
				}

				.prev {
					border: 3px solid blue;
					width: 20px;
					height: 20px;
					transform: rotate(-135deg);
					border-left: none;
					border-bottom: none;
					position: absolute;
					left: 10px;
					top: 5px;
					cursor: pointer;
				}
				.animate {
					/*transform: rotateX(360deg);*/
					/*transform-origin: 10% 10%;*/

					animation-name: c;
					animation-duration: .3s;
					animation-timing-function: linear;
					animation-iteration-count: 1;
					animation-fill-mode: revert;
					animation-delay: 0s;
					display: inline-block;
				}


			}

			.months {
				border: 1px solid aqua;
				padding: 5px 20px;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				margin-bottom: 10px;
				width: 100%;
				height: 40px;
				background-color: #ffffff;
				color: #000000;
				white-space: nowrap;
				perspective: 800px;

				.month {
					width: 100%;
					height: 100%;
					background-color: #ffffff;
					color: #000000;
					border: 1px solid blue;
					position: absolute;
					transition: all .5s;
					top: 0;
					left: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					transform-origin: 10% 10%;
					/*transform-origin: 100% 100%;*/
					.next {
						border: 3px solid blue;
						width: 20px;
						height: 20px;
						transform: rotate(45deg);
						border-left: none;
						border-bottom: none;
						position: absolute;
						right: 10px;
						top: 5px;
						cursor: pointer;
					}

					.prev {
						border: 3px solid blue;
						width: 20px;
						height: 20px;
						transform: rotate(-135deg);
						border-left: none;
						border-bottom: none;
						position: absolute;
						left: 10px;
						top: 5px;
						cursor: pointer;
					}
				}

				.animate {
					transform: rotateX(360deg);
					transform-origin: 10% 10%;
				}


			}


			.days {
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				align-items: center;
				border: 1px solid aqua;
				padding: 20px 0;

				.day {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 30px;
					height: 30px;
					flex: 0 0 auto;
					border-radius: 50%;
					transition: all .5s;
					cursor: pointer;

					&:hover {
						background-color: orange;
						color: #ffffff;
					}


					&.select {
						background-color: blue;
						color: #ffffff;
					}
				}

				margin-bottom: 30px;


			}

			.buttons {
				display: flex;
				flex-direction: row-reverse;
				justify-content: space-between;
				align-items: center;
				width: 100%;


				.button {
					flex: 1 1 auto;
					border: 1px solid blue;
					color: blue;
					padding: 5px;
					transition: all .2s;
					cursor: pointer;
					border-radius: 5px;
					margin: 5px;

					&:hover {
						background-color: blue;
						color: #ffffff;

					}

				}
			}
		}


	}


	.space {
		margin: 0 7px;
	}

	.main {
		color: red;
		position: absolute;
		left: 300px;
		top: 0;
		transition: all 1s;
		transform: skewX(0deg);
		display: none;
	}

	.my {
		animation-name: c;
		animation-duration: 1s;
		animation-timing-function: linear;
		animation-iteration-count: 1;
		animation-fill-mode: revert;
		animation-delay: 0s;
		display: inline-block;

	}

	@keyframes c {
		0% {
			left: -10%;
			transform: skewX(-30deg);
		}
		10% {
			left: -5%;
			transform: skewX(-30deg);
		}
		20% {
			left: 0;
			transform: skewX(-30deg);
		}
		30% {
			left: 5%;
			transform: skewX(-30deg);
		}
		40% {
			left: 10%;
			transform: skewX(-30deg);
		}
		50% {
			left: 15%;
			transform: skewX(-30deg);
		}
		60% {
			left: 20%;
			transform: skewX(-30deg);
		}
		70% {
			left: 25%;
			transform: skewX(-30deg);
		}
		80% {
			left: 30%;
			transform: skewX(-30deg);
		}
		90% {
			left: 35%;
			transform: skewX(-30deg);
		}
		100% {
			left: 40%;
			transform: skewX(0deg);

		}

	}

</style>