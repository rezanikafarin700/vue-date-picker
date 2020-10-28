<template>
	<div>
<!--		{{ myString }}-->
<!--		<input v-model="st"/>-->
<!--		<div v-for="(n,index) of cnames" :key="index">{{ n }}</div>-->

<!--		<hr>-->
<!--		<div  v-custom="{color : 'orange',fontSize:'32px',fontWeight: 'bold'}">{{ st | toUpper }}</div>-->
<!--		<br><br>-->

		<button @click="y++;show=!show">Click</button>
		<p class="main" :class="{my : !show}">{{ y }} : سال</p>
		<p class="main" :class="{my : show}">{{ y }} : سال</p>

		<div class="con-input" @click="show = !show">
			<input type="text" v-model="date" @click="close = false">
		</div>
		<div class="con" v-if="!close">
			<transition name="fade">
				<date-picker class="child" v-if="show && !close" v-model="date" @close="result"/>
			</transition>
		</div>
	</div>
</template>

<script>
    import DatePicker from "../components/DatePicker";
    import {mixin} from './reza'

    export default {
        name: "UseDatePicker",

        components: {
            DatePicker
        },

        data() {
            return {
                date: '',
                show: false,
                close: false,
                y: 1399,
                x: 1399,
                st: '',
                names: ['ali', 'reza', 'alireza', 'mahdi', 'sajjad', 'mohammad', 'hamed', 'hamid'],

            }
        },

        mixins: [mixin],

        computed: {
            cnames: function () {
                const vm = this;
                return vm.names.filter(function (n) {
                    return (n.indexOf(vm.st) > -1);
                })
            }
        },

        methods: {
            result(e) {
                this.close = e;
            }
        },


        directives: {
            custom: {
                bind(el, binding) {
                    el.style.animationName = "c";
                    el.style.animationDirection = "1s";
                    el.style.animationIterationCount = "1";
                    el.style.animationTimingFunction = "linear";
                    el.style.color = binding.value.color;
                    el.style.fontSize = binding.value.fontSize;
                    el.style.fontWeight = binding.value.fontWeight;
                }
            }
        },

        filters: {
            toUpper(st) {
                return st.toUpperCase();
            }
        }

    }
</script>

<style scoped lang="scss">

	.con-input {
		position: relative;
		width: 200px;
		height: 40px;
		margin: 100px auto;

		input {
			width: 100%;
			height: 100%;
			border-radius: 10px;
			outline: none;
		}


	}

	.con {
		width: 250px;
		margin: 100px auto;
		position: relative;
		top: -100px;
		left: 0;

		.child {
			width: 100%;
			height: 100%;
		}
	}

	.fade-enter-active, .fade-leave-active {
		transition: all .5s;
		transform: scale(1);
	}

	.fade-enter {
		transform: scale(0);
	}


	.fade-leave1 {

	}

	.fade-leave-to {
		transform: scale(0);
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

	@keyframes a {
		0% {
			transform: translate(0)
		}
		10% {
			transform: translate(10px)
		}
		20% {
			transform: translate(20px)
		}
		30% {
			transform: translate(30px)
		}
		40% {
			transform: translate(40px)
		}
		50% {
			transform: translate(50px)
		}
		60% {
			transform: translate(60px)
		}
		70% {
			transform: translate(70px)
		}
		80% {
			transform: translate(80px)
		}
		90% {
			transform: translate(90px)
		}
		100% {
			transform: translate(100px)
		}

	}

	@keyframes b {
		0% {
			transform: skewX(0deg);
			left: 0
		}
		10% {
			transform: skewX(-10deg);
			left: 10px
		}
		20% {
			transform: skewX(-20deg);
			left: 20px
		}
		30% {
			transform: skewX(-30deg);
			left: 30px
		}
		40% {
			transform: skewX(-40deg);
			left: 40px
		}
		50% {
			transform: skewX(-50deg);
			left: 50px
		}
		60% {
			transform: skewX(-40deg);
			left: 60px
		}
		70% {
			transform: skewX(-30deg);
			left: 70px
		}
		80% {
			transform: skewX(-20deg);
			left: 80px
		}
		90% {
			transform: skewX(-10deg);
			left: 90px
		}
		100% {
			transform: skewX(0deg);
			left: 100px
		}

	}

	@keyframes c {
		0% {
			left: 0;
			top: 0;
			transform: skewX(30deg);
		}
		10% {
			left: 0;
			top: 20px;
			transform: skewX(30deg);
		}
		20% {
			left: 0;
			top: 0;
			transform: skewX(30deg);
		}
		30% {
			left: 0;
			top: 20px;
			transform: skewX(30deg);
		}
		40% {
			left: 20px;
			top: 0;
			transform: skewX(0);
		}
		50% {
			left: 50px;
			top: 0;
			transform: skewX(-30deg);
		}
		60% {
			left: 100px;
			top: 0;
			transform: skewX(-30deg);
		}
		70% {
			left: 150px;
			top: 0;
			transform: skewX(-30deg);
		}
		80% {
			left: 200px;
			top: 0;
			transform: skewX(-30deg);

		}
		90% {
			left: 250px;
			top: 0;
			transform: skewX(-30deg);

		}
		100% {
			left: 300px;
			top: 0;
			transform: skewX(-30deg);

		}

	}

	@keyframes d {
		0%{left: 0}
		20%{left: 40px}
		40%{left: 80px}
		60%{left: 120px}
		80%{left: 160px}
		100%{left: 200px}
	}

</style>