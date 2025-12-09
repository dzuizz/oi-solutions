// https://orac2.info/problem/175/
#include<bits/stdc++.h>
using namespace std;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int d; cin>>d;
  int cnt=0;
  while(d--){
    int x; cin>>x;
    (x?cnt=0:++cnt);
  }
  cout<<cnt<<'\n';
  return 0;
}

