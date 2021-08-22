<template>
  <div class="__collection_unit__">
    <div class="collection-char collection-char-light-side">
      <div class="player-char-portrait char-portrait-full" :class="[gear_class, alignment_class]">
        <a href="/p/979863726/characters/echo" class="char-portrait-full-link" rel="nofollow">
          <div class="image_stack">
            <img class="char-portrait-full-img initial loading" :src="unit.image" alt="Echo" height="80" width="80"
                 style="position: absolute; top:0; left: 0;"
                 data-was-processed="true">
            <img class="char-portrait-full-img initial loading faded" :src="unit.image" alt="Echo" height="80" width="80"
                 :style="clip_path"
                 data-was-processed="true">
          </div>
          <div class="char-portrait-full-gear"></div>
          <div
              v-for="i in 7"
              :key="i"
              class="star"
              :class="[`star${i}`, `${progress.stars >= i ? '' : 'star-inactive'}`]"
          >
          </div>
          <div class="char-portrait-full-level">85</div>
          <div class="char-portrait-full-relic" v-if="progress.relic > 0">{{progress.relic}}</div>
          <div class="char-portrait-progress-percent">{{ progress.current_progress }}%</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CollectionUnit",
    props: ['progress', 'unit'],
    computed: {
      gear_class(){
        return `char-portrait-full-gear-t${this.progress.gear}`
      },
      clip_path() {
        const percent = 100-this.progress.current_progress;
        return `clip-path: polygon(0px ${percent}%, 100% ${percent}%, 100% 0%, 0% -50%);`
      },
      alignment_class() {
        return this.unit.alignment === 'Light Side' ?
            'char-portrait-full-alignment-light-side' :
            'char-portrait-full-alignment-dark-side';
      }

    }
  }
</script>

<style lang="scss">
  .__collection_unit__ {
    .char-portrait-full {
      position: relative;
      width: 84px;
      height: 84px;
      background-color: #000;
      box-shadow: 0 0 0 2px #555;
      border-radius: 50%;
    }
    .image_stack{
      position:relative;
      img {
        position: absolute;
        top:0;
        left:0;
      }
    }
    .faded {
      filter:saturate(0%) brightness(0.25);
    }
    .char-portrait-full-img {
      width: 84px;
      height: 84px;
      border-radius: 50%;
      background-color: #000;
    }
    .collection-char .player-char-portrait {
      margin: 15px auto 10px;
      box-shadow: 0 0 1px 2px #111;
    }
    .char-portrait-full-gear-t13 .char-portrait-full-gear {
      background-image: url(https://swgoh.gg/static/img/ui/g13-frame-atlas.png);
      width: 105px;
      height: 98px;
      background-size: 100%;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
    .char-portrait-full-gear {
      position: absolute;
      width: 84px;
      height: 84px;
      z-index: 2;
      top: 0;
      left: 0;
    }
    .star {
      position: absolute;
      bottom: 50%;
      left: 50%;
      width: 15px;
      height: 55px;
      color: #000;
      transform-origin: center bottom;
      background: center 0 transparent url(https://swgoh.gg/static/img/star.png) no-repeat;
      background-size: 100%;
      z-index: 2;
    }
    .star1 {transform: translateX(-50%) rotate(-60deg);}
    .star2 {transform: translateX(-50%) rotate(-40deg);}
    .star3 {transform: translateX(-50%) rotate(-20deg);}
    .star4 {transform: translateX(-50%) rotate(0deg);}
    .star5 {transform: translateX(-50%) rotate(20deg);}
    .star6 {transform: translateX(-50%) rotate(40deg);}
    .star7 {transform: translateX(-50%) rotate(60deg);}
  }
  .star.star-inactive {
    background-image: url(https://swgoh.gg/static/img/star-inactive.png);
  }
  .char-portrait-full-relic, .char-portrait-full-zeta, .char-portrait-progress-percent {
    position: absolute;
    z-index: 4;
    color: #fff;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
  }
  .char-portrait-progress-percent {
    background-size: contain;
    width: 50px;
    height: 40px;
    top: -12px;
    left: 18px;
    line-height: 40px;
    text-shadow: -1px -1px 0 #333, 2px -1px 0 #333, 2px 2px 0 #333, -1px 2px 0 #333, 2px 3px 0 #333, 1px 3px 0 #333, 2px 3px 0 #333;
  }
  .char-portrait-full-zeta {
    background-size: contain;
    width: 50px;
    height: 40px;
    top: 48px;
    left: -17px;
    line-height: 40px;
    text-shadow: -1px -1px 0 #7028c9, 2px -1px 0 #7028c9, 2px 2px 0 #7028c9, -1px 2px 0 #7028c9, 2px 3px 0 #7028c9, 1px 3px 0 #7028c9, 2px 3px 0 #7028c9;
  }
  .char-portrait-full-relic {
    background-image: url(https://swgoh.gg/static/img/ui/relic-badge-atlas.png);
    background-size: 100%;
    width: 44px;
    height: 44px;
    top: 44px;
    right: -13px;
    line-height: 43px;
    text-shadow: -1px -1px 0 #000, 2px -1px 0 #000, 2px 2px 0 #000, -1px 2px 0 #000, 2px 3px 0 #000, 1px 3px 0 #000, 2px 3px 0 #000;
  }
  .char-portrait-full-relic, .char-portrait-full-zeta {
    position: absolute;
    z-index: 4;
    color: #fff;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
  }
  .char-portrait-full-level {
    position: absolute;
    bottom: -5px;
    left: 50%;
    z-index: 4;
    width: 36px;
    font-size: 17px;
    padding: 0 5px;
  }
  .char-portrait-full-gear-level, .char-portrait-full-level {
    position: absolute;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
    color: #fff;
    font-weight: 700;
    background-color: #264257;
    border: 2px solid #fff;
    text-align: center;
    border-radius: 100%/130% 130% 15px 15px;
    box-shadow: 0 1px 2px rgb(0 0 0 / 50%);
    text-shadow: -1px -1px 0 #000, 2px -1px 0 #000, 2px 2px 0 #000, -1px 2px 0 #000, 2px 3px 0 #000, 1px 3px 0 #000, 2px 3px 0 #000;
  }
  .char-portrait-full-gear-t1 .char-portrait-full-gear {
    background-image: url(https://swgoh.gg/static/img/ui/gear-icon-g1.svg);
  }
  .char-portrait-full-gear-t2 .char-portrait-full-gear {
    background-image: url(https://swgoh.gg/static/img/ui/gear-icon-g2.svg);
  }
  .char-portrait-full-gear-t3 .char-portrait-full-gear {
    background-image: url(https://swgoh.gg/static/img/ui/gear-icon-g3.svg);
  }
  .char-portrait-full-gear-t4 .char-portrait-full-gear {
    background-image: url(https://swgoh.gg/static/img/ui/gear-icon-g4.svg);
  }
  .char-portrait-full-gear-t5 .char-portrait-full-gear {
    background-image: url(https://swgoh.gg/static/img/ui/gear-icon-g5.svg);
  }
  .char-portrait-full-gear-t6 .char-portrait-full-gear {
    background-image: url(https://swgoh.gg/static/img/ui/gear-icon-g6.svg);
  }
  .char-portrait-full-gear-t7 .char-portrait-full-gear {
    background-image: url(https://swgoh.gg/static/img/ui/gear-icon-g7.svg);
  }
  .char-portrait-full-gear-t8 .char-portrait-full-gear {
    background-image: url(https://swgoh.gg/static/img/ui/gear-icon-g8.svg);
  }
  .char-portrait-full-gear-t9 .char-portrait-full-gear {
    background-image: url(https://swgoh.gg/static/img/ui/gear-icon-g9.svg);
  }
  .char-portrait-full-gear-t10 .char-portrait-full-gear {
    background-image: url(https://swgoh.gg/static/img/ui/gear-icon-g10.svg);
  }
  .char-portrait-full-gear-t11 .char-portrait-full-gear {
    background-image: url(https://swgoh.gg/static/img/ui/gear-icon-g11.svg);
  }
  .char-portrait-full-gear-t12 .char-portrait-full-gear {
    background-image: url(https://swgoh.gg/static/img/ui/gear-icon-g12.svg);
  }

  .char-portrait-full-gear-t13.char-portrait-full-alignment-dark-side .char-portrait-full-gear {
    background-position: 0 50%;
  }
</style>
