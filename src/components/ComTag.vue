<template>
  <div id="content">
        <div class="content-box">
            <h2 class="tag-title">Tag Clouds <i class="iconfont icon-tag">&#xe6cc;</i></h2>
            <div class="clouds">
                <a href="javascript:void(0)" style="font-size:30px;color:#960999;" class="clouds-link">JS</a>
                <a href="javascript:void(0)" style="font-size:24px;color:#282feb;"class="clouds-link">MySQL</a>
                <a href="javascript:void(0)" style="font-size:36px;color:#f68357;"class="clouds-link">JAVA</a>
                <a href="javascript:void(0)" style="font-size:19px;color:#9af6a7;"class="clouds-link">Vue.js</a>
                <a href="javascript:void(0)" style="font-size:24px;color:#8dbbef;"class="clouds-link">git</a>
                <a href="javascript:void(0)" style="font-size:29px;color:#fb3328;"class="clouds-link">Hexo</a>
                <a href="javascript:void(0)" style="font-size:19px;color:#fb3328;"class="clouds-link">node.js</a>
                <a href="javascript:void(0)" style="font-size:32px;color:#282feb;"class="clouds-link">html</a>
                <a href="javascript:void(0)" style="font-size:22px;color:#9af6a7;"class="clouds-link">正则表达式</a>
                <a href="javascript:void(0)" style="font-size:32px;color:#ef2223"class="clouds-link">jQuery</a>
                <a href="javascript:void(0)" style="font-size:23px;color:#6cc3df"class="clouds-link">React</a>
                <a href="javascript:void(0)" style="font-size:32px;color:#dec978;"class="clouds-link">Spring框架</a>
                <a href="javascript:void(0)" style="font-size:30px;color:#9a76ee"class="clouds-link">JSP</a>
                <a href="javascript:void(0)" style="font-size:20px;color:#f68357;"class="clouds-link">css</a>
                <a href="javascript:void(0)" style="font-size:35px;color:#70df94;"class="clouds-link">Bootstrap</a>
                <a href="javascript:void(0)" style="font-size:24px;color:#9a76ee;"class="clouds-link">PHP</a>
                <a href="javascript:void(0)" style="font-size:19px;color:#8dbbef;"class="clouds-link">JSON</a>
                <a href="javascript:void(0)" style="font-size:35px;color:#9a76ee"class="clouds-link">Andriod</a>
                <a href="javascript:void(0)" style="font-size:24px;color:#5bc182"class="clouds-link">Ajax</a>
            </div>
            <hr>
            <div class="message">
                <div class="message-title">
                    <h2 >留言板 <i class="iconfont message-icon">&#xe615;</i></h2>
                </div>
                <textarea name="message" id="message" cols="80" rows="8" placeholder="请留言"></textarea>
                <div class="image">
                </div>
                <input type="submit" value="submit">
            </div>

        </div>
    </div>
</template>
<script>
export default {
  name: "ComTag",
  data () {
    return {

    };
  }
}
</script>
<style lang='scss' scoped>
@import"@/assets/scss/reset.scss";

#content{
    width:1000px;
    height: 986px;
    margin:-150px auto 0;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 0px 10px #dadce0;
    transition: .3s;
    &:hover{
        z-index:23;
        top:508px;
        box-shadow:0px 0px 15px rgba(0, 0, 0, 0.4);
    }
    .content-box{
        width:1000px;
        height:300px;
        margin:30px auto;
        text-align: center;
        padding-top:30px;
       
        h2{
            position: relative;
            font-size:50px;
            line-height: 50px;
            font-weight: 500;
            cursor: pointer;
            .icon-tag{
                position: absolute;
                top:30px;
                left:628px;
                font-size:30px;
                color:#2196f3;
                transform-origin: top left;
            }
            &:hover i.icon-tag{
                animation:icontag 2s  linear  infinite;
            }
        }
        .clouds{
            width: 980px;
            height: 419px;
            margin:30px auto;
            a{
                // display: block;
                float:left;
                margin:16px 50px;
                transition: .3s;
               
            }
            .clouds-link:hover{
                color:#ff7242 !important;
                transform: scale(1.3);
            }
           
        }
        hr{
            display: block;
            width: 1000px;
            height: 5px;
            margin: 30px 0;
            border: 2px dashed #a4d8fa;
            border-left:none;
            border-right: none;
        }

    }

    
    .content-box > .message{
        position: relative;
        width:900px;
        height:328px;
        margin:0 auto;
        border-radius: 20px;
        // box-shadow:0px 0px 10px rgba(0, 0, 0, 0.4);
        border:1px solid #999;
        .message-title{
            height:50px;
            border-bottom: 1px dashed #999;
            h2{
                float:left;
                font-size: 24px;
                margin-left:30px;
                .message-icon{
                    position: absolute;
                    top:-10px;
                    left:116px;
                    color:#2196f3;
                    font-size: 34px;
                    transform-origin: top center;
                }
                &:hover i.message-icon{
                    animation:icontag 2s  linear  infinite;

                }

            }
        }
        textarea{
            display: blcok;
            float:left;
            resize: none;
            outline: none;
            margin:20px 10px;
            text-indent: 20px;
            line-height: 24px;
            border:none;
            font-size: 16px;

        }
        .image{
            display: block;
            position: absolute;
            right:30px;
            height:205px;
            width:70px;
            background:url("~@/assets/img/fun/other/cat.png") 0px -693px /cover;
        }
        input{
            position: absolute;
            bottom:20px;
            right: 136px;
            width:120px;
            height:40px;
            background-color: #2196f3;
            outline: none;
            border:none;
            color:#fff;
            font-size: 20px;
            line-height: 40px;
            border-radius: 10px;
            cursor: pointer;
        }
    }
}


</style>