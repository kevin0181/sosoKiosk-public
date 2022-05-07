package sosokiosk.kiosk.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import lombok.SneakyThrows;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import sosokiosk.kiosk.dto.detail.UserDetail;
import sosokiosk.kiosk.entity.User;

@Service
public class FirebaseService implements UserDetailsService {
    public static final String COLLECTION_NAME = "user";

    @SneakyThrows
    @Override
    public UserDetails loadUserByUsername(String user) throws UsernameNotFoundException {

        Firestore db = FirestoreClient.getFirestore();
        User userDTO = null;
        ApiFuture<DocumentSnapshot> apiFuture = db.collection(COLLECTION_NAME).document("kiosk").get();
        DocumentSnapshot documentSnapshot = apiFuture.get();
        if (documentSnapshot.exists()) {
            userDTO = documentSnapshot.toObject(User.class);
        }

        if (userDTO == null) {
            throw new UsernameNotFoundException(user);
        }

        return new UserDetail(userDTO);
    }
}
