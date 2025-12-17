// https://orac2.info/problem/122/
#include<bits/stdc++.h>
using namespace std;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int tx,ty,cx=0,cy=0; cin>>tx>>ty;
  bool cd=1;
  string ans="";
  for(int i=0;cx!=tx || cy!=ty;++i){
    if(i&1){
      if(ty>cy) ans+=(cd?'L':'R'),cd=1,++cy;
      else ans+=(cd?'R':'L'),cd=0,--cy;
    }else{
      if(tx>cx) ans+=(cd?'R':'L'),cd=1,++cx;
      else ans+=(cd?'L':'R'),cd=0,--cx;
    }
  }
  cout<<ans<<'\n';
  return 0;
}

