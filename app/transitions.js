export default function(){
  this.transition(
    this.toRoute(function(routeName){
      console.log(`routeName: ${routeName}`);
      return true;
    }),
    this.use('toRight'),
    this.debug()
  )
};
