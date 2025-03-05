import { HelpCircleIcon } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { ButtonProps } from "react-native";
import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "../ui/modal"
import { Heading } from "../ui/heading";
import { CloseIcon, Icon } from "../ui/icon";
import { Text } from "../ui/text";
import { useState } from "react";


export default function HelpButton({ title, message, className }: { title: string, message: string, className?: string }) {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <Button variant="link" className={className} onPress={() => setShowModal(true)}>
                <ButtonIcon as={HelpCircleIcon} className="text-primary-500" />
            </Button>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                }}
                size="md"
            >
                <ModalBackdrop />
                <ModalContent className="rounded-xl">
                    <ModalHeader>
                        <Heading size="md" className="text-typography-950">{title}</Heading>
                        <ModalCloseButton>
                            <Icon
                                as={CloseIcon}
                                size="md"
                                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                            />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <Text size="sm" className="text-typography-500">{message}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="rounded-lg" onPress={() => setShowModal(false)}>
                            <ButtonText>OK</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}