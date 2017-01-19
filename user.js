/**
 * Created by Vlad on 09.09.2016.
 */
function user(f_name,l_name) {
    this.f_name = f_name;
    this.l_name = l_name;
    this.avatar = f_name + '.jpg';
    this.id ='uid' + f_name;
    this.counter = 0;
    this._id = Math.floor(Math.random()*60);
}
module.exports = user;