<template>
  <div class="__collection_unit__">
    <div class="collection-char collection-char-light-side">
      <div class="player-char-portrait char-portrait-full char-portrait-full-gear-t10 char-portrait-full-alignment-light-side">
        <a href="/p/979863726/characters/echo" class="char-portrait-full-link" rel="nofollow">
          <img class="char-portrait-full-img initial loading" src="https://game-assets.swgoh.gg/tex.charui_bb_echo.png" alt="Echo" height="80" width="80" data-was-processed="true">
          <div class="char-portrait-full-gear"></div>
          <div class="star star1"></div>
          <div class="star star2"></div>
          <div class="star star3"></div>
          <div class="star star4"></div>
          <div class="star star5"></div>
          <div class="star star6 star-inactive"></div>
          <div class="star star7 star-inactive"></div>
          <div class="char-portrait-full-zeta">1</div>
          <div class="char-portrait-full-level">85</div>
        </a>
      </div>
      <div class="collection-char-gp" data-toggle="tooltip" data-container="body" title="" data-original-title="Power 14,463 / 31,624">
        <div class="collection-char-gp-progress">
          <div class="collection-char-gp-progress-bar" style="width: 45.7343%;"></div>
        </div>
        <div class="collection-char-gp-label">
          <span class="collection-char-gp-label-value">45</span>
          <span class="collection-char-gp-label-percent">%</span>
        </div>
      </div>
      <div class="collection-char-name">
        <a class="collection-char-name-link" href="/p/979863726/characters/echo" rel="nofollow">
          Echo
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CollectionUnit",
    props: ['unit'],
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
  .char-portrait-full-relic, .char-portrait-full-zeta {
    position: absolute;
    z-index: 4;
    color: #fff;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
  }
  .char-portrait-full-zeta {
    background: 50% transparent url(https://swgoh.gg/static/img/assets/tex.skill_zeta_glow.png) no-repeat;
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
    width: 30px;
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
</style>
