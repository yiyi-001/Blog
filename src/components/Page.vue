<template>
  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="5"                
      layout="prev, pager, next, jumper"
      :total="total"
      :pager-count="5"
    >
    </el-pagination>
  </div>


</template>
<script>
export default {
  name: "Page",
  props: ["num", "page"],   //传入的总条数，和页码
  data() {
    return {};
  },
  computed: {
    currentPage: function() {
      return this.page;
    },
    total: function() {
      return this.num;
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("size-change", val);
    },
    handleCurrentChange(val) {
      this.$emit("current-change", val);
    }
  }
};

</script>
<style lang='scss' scoped>

 .block {
    text-align: center;
    /* width: 100%; */
  }

</style>